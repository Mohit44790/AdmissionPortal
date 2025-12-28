package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.Payment;
import com.mohit44790.admission.entity.PaymentStatus;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.repository.PaymentRepository;
import com.mohit44790.admission.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private StudentProfileRepository profileRepo;

    public Map<String, Object> createOrder(Long studentId) {

        StudentProfile profile = profileRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        double amount = 1500.00; // Admission fee

        // 🔹 Call Razorpay / Cashfree SDK here
        String orderId = "order_" + System.currentTimeMillis(); // demo

        Payment payment = new Payment();
        payment.setStudentProfile(profile);
        payment.setAmount(amount);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setOrderId(orderId);
        payment.setCreatedAt(LocalDateTime.now());

        paymentRepo.save(payment);

        return Map.of(
                "orderId", orderId,
                "amount", amount,
                "currency", "INR"
        );
    }
}

