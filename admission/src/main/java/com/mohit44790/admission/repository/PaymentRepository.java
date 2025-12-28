package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Payment;
import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByStudentProfile(StudentProfile profile);
}
