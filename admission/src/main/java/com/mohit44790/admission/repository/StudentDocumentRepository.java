package com.mohit44790.admission.repository;


import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {

    List<StudentDocument> findByStudentProfile(StudentProfile profile);
}


