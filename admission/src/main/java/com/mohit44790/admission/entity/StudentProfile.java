package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔐 User mapping
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ✅ SELECTED COURSE
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Enumerated(EnumType.STRING)
    private AdmissionStatus admissionStatus = AdmissionStatus.PENDING;

    private String adminRemark;
    private Double percentage;

    // ---------- PERSONAL ----------
    private String fullName;
    private String alternatePhone;
    private String alternateEmail;
    private String gender;
    private String dob;

    // ---------- FAMILY ----------
    private String fatherName;
    private String motherName;
    private String familyIncome;

    // ---------- BANK ----------
    private String bankName;
    private String accountNumber;
    private String ifsc;

    // ---------- CATEGORY ----------
    private String category;
    private String caste;
    private String quota;

    // ---------- OTHER ----------
    private String nationality;
    private String religion;
    private String disability;

    private int completedStep = 0;
}
