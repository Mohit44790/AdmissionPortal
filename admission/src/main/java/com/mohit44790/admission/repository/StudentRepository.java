package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
