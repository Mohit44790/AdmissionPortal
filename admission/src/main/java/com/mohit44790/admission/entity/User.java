package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        }
)
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String password;

    private boolean emailVerified;

    private String otp;
    private LocalDateTime otpExpiry;

    private int otpAttempts;
    private LocalDateTime otpLastSent;

    // PROFILE DETAILS
    private String address;
    private String course;
    private String gender;
}
