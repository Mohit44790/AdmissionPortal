package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔐 mapping with user
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // StudentProfile.java (add these fields)
    @Enumerated(EnumType.STRING)
    private AdmissionStatus admissionStatus = AdmissionStatus.PENDING;

    private String adminRemark;

    // ---------- STEP 1 : PERSONAL ----------
    private String fullName;
    private String alternatePhone;
    private String alternateEmail;
    private String gender;
    private String dob;

    // ---------- STEP 2 : FAMILY ----------
    private String fatherName;
    private String motherName;
    private String familyIncome;

    // ---------- STEP 3 : BANK ----------
    private String bankName;
    private String accountNumber;
    private String ifsc;

    // ---------- STEP 4 : CATEGORY ----------
    private String category;
    private String caste;
    private String quota;

    // ---------- STEP 5 : OTHER ----------
    private String nationality;
    private String religion;
    private String disability;

    // ---------- STEP TRACKING ----------
    private int completedStep = 0;
}

