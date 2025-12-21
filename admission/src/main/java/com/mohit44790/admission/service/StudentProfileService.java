package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.DocumentType;
import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.StudentDocumentRepository;
import com.mohit44790.admission.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentProfileService {

    @Autowired
    StudentProfileRepository repo;
    @Autowired
    StudentDocumentRepository docRepo;

    public StudentProfile getOrCreate(User user) {
        return repo.findByUser(user).orElseGet(() -> {
            StudentProfile p = new StudentProfile();
            p.setUser(user);
            return repo.save(p);
        });
    }

    public StudentProfile save(StudentProfile profile, int step) {
        profile.setCompletedStep(step);
        return repo.save(profile);
    }

    // ✅ DOCUMENT SAVE
    public void saveDocument(StudentProfile profile,
                             DocumentType type,
                             String path) {

        StudentDocument d = new StudentDocument();
        d.setStudentProfile(profile);
        d.setDocumentType(type);
        d.setFilePath(path);

        docRepo.save(d);
    }

    public List<StudentDocument> getDocuments(StudentProfile profile) {
        return docRepo.findByStudentProfile(profile);
    }
}

