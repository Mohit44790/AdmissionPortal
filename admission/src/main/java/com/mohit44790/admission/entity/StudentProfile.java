package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Logged-in user mapping
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // -------- BASIC DETAILS (STEP BY STEP) --------
    private String fullName;
    private String alternatePhone;
    private String alternateEmail;

    // -------- ADDRESS --------
    private String addressLine;
    private String city;
    private String state;
    private String pincode;

    // -------- FAMILY DETAILS --------
    private String fatherName;
    private String motherName;
    private String familyIncome;

    // -------- CATEGORY --------
    private String category;
    private String caste;
}
