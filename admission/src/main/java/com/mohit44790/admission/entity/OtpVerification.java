package com.mohit44790.admission.entity;


import java.time.LocalDateTime;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String otp;

    private int attempts;          // 👈 wrong attempts
    private LocalDateTime expiryTime;
    private LocalDateTime lockedTill; // 👈 lock for 10 min

    // getters & setters
}



