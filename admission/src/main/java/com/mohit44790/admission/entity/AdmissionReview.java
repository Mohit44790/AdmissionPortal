package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class AdmissionReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 👨‍💼 Admin who reviewed
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    // 🎓 Student profile
    @ManyToOne
    @JoinColumn(name = "student_profile_id")
    private StudentProfile studentProfile;

    @Enumerated(EnumType.STRING)
    private AdmissionStatus status; // APPROVED / REJECTED

    private String remark;

    private LocalDateTime reviewedAt;
}
