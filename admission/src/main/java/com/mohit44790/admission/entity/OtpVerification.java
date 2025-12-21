package com.mohit44790.admission.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class OtpVerification {

    @Id @GeneratedValue
    private Long id;

    private String email;
    private String otp;
    private LocalDateTime expiryTime;
}

