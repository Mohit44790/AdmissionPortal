package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {
}

