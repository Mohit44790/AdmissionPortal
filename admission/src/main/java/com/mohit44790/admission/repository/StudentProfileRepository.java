package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
}

