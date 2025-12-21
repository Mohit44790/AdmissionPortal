package com.mohit44790.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class AdmissionApplication {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private StudentProfile studentProfile;


    private String programLevel;
    private String courseName;
    private String collegeName;
    private String status;
}

