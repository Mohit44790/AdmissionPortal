package com.mohit44790.admission.entity;

import jakarta.persistence.*;


@Entity
public class StudentDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentType;
    private String filePath;

    @ManyToOne
    private StudentProfile studentProfile;
}

