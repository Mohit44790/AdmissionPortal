package com.mohit44790.admission.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
    @Data
    public class AdmissionReview {

        @Id
        @GeneratedValue
        private Long id;

        @ManyToOne
        private User admin;

        @ManyToOne
        private StudentProfile studentProfile;

        @Enumerated(EnumType.STRING)
        private AdmissionStatus status;

        private String remark;

        private LocalDateTime reviewedAt;
    }


