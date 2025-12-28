package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FeePayment {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private StudentProfile profile;

    private Double amount;

    private String transactionId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // PENDING, PAID, FAILED
}

