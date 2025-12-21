package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.DocumentType;
import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.StudentDocumentRepository;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.StudentProfileService;
import com.mohit44790.admission.util.FileUploadUtil;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/student/admission")
public class AdmissionController {

    @Autowired
    private StudentProfileService service;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private FileUploadUtil fileUtil;
    @Autowired
    private StudentDocumentRepository docRepo;

    private StudentProfile getProfile(Principal principal) {
        User u = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.getOrCreate(u);
    }

    // 📤 UPLOAD DOCUMENT
    @PostMapping("/upload-document")
    public String uploadDocument(@RequestParam MultipartFile file,
                                 @RequestParam DocumentType type,
                                 Principal principal) throws Exception {

        StudentProfile profile = getProfile(principal);

        if (profile.getCompletedStep() < 5) {
            throw new RuntimeException("Complete profile before admission");
        }

        String path = fileUtil.saveFile(file);
        service.saveDocument(profile, type, path);

        return type + " uploaded successfully";
    }

    // 📄 GET ALL DOCUMENTS
    @GetMapping("/documents")
    public List<StudentDocument> documents(Principal principal) {
        StudentProfile profile = getProfile(principal);
        return service.getDocuments(profile);
    }

    @GetMapping("/view-document/{id}")
    public ResponseEntity<Resource> viewDocument(@PathVariable Long id,
                                                 Principal principal) throws Exception {

        StudentDocument doc = docRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        User loggedInUser = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ ALLOW IF:
        // 1️⃣ Logged-in user is ADMIN
        // 2️⃣ OR document belongs to logged-in student
        boolean isAdmin = loggedInUser.getRole().name().equals("ADMIN");
        boolean isOwner = doc.getStudentProfile()
                .getUser()
                .getEmail()
                .equals(loggedInUser.getEmail());

        if (!isAdmin && !isOwner) {
            throw new RuntimeException("Unauthorized access");
        }

        Path path = Paths.get(doc.getFilePath()).normalize();
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found");
        }

        String contentType = Files.probeContentType(path);
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + path.getFileName().toString() + "\"")
                .body(resource);
    }


}

