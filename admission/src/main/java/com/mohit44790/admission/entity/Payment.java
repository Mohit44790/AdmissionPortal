package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private StudentProfile studentProfile;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // PENDING, PAID, FAILED

    private String orderId;        // Razorpay order_id
    private String transactionId;  // payment_id

    private LocalDateTime createdAt;
}

