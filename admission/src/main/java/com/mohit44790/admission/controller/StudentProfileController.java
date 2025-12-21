package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.StudentProfileService;
import com.mohit44790.admission.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/student")
public class StudentProfileController {

    @Autowired
    StudentProfileService service;
    @Autowired
    FileUploadUtil util;
    @Autowired
    UserRepository userRepo;

    @PostMapping("/upload")
    public void upload(@RequestParam MultipartFile file,
                       @RequestParam String type,
                       Principal principal) throws Exception {

        User u = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile p = service.getOrCreate(u);

        // ✅ FIX HERE
        String path = util.saveFile(file);

        service.saveDocument(p, type, path);
    }

}

