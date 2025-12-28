package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Payment;
import com.mohit44790.admission.entity.PaymentStatus;
import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 🔹 Student payment history
    List<Payment> findByStudentProfile(StudentProfile profile);

    // 🔹 Webhook / verification
    Optional<Payment> findByOrderId(String orderId);

    // 🔹 Admin payment report
    List<Payment> findByStatus(PaymentStatus status);
}
