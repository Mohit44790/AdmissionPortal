package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpVerification,Long> {
    Optional<OtpVerification> findByEmail(String email);
}

