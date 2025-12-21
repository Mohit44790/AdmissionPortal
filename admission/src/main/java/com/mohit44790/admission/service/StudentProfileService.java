package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.StudentDocumentRepository;
import com.mohit44790.admission.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    @Autowired
    StudentProfileRepository repo;
    @Autowired
    StudentDocumentRepository docRepo;

    public StudentProfile getOrCreate(User u){
        return repo.findByUser(u).orElseGet(()->{
            StudentProfile p=new StudentProfile();
            p.setUser(u);
            return repo.save(p);
        });
    }

    public void saveDocument(StudentProfile p,String type,String path){
        StudentDocument d=new StudentDocument();
        d.setDocumentType(type);
        d.setFilePath(path);
        d.setStudentProfile(p);
        docRepo.save(d);
    }
}

