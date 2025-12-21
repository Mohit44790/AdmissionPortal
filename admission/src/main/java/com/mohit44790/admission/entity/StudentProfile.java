package com.mohit44790.admission.entity;


import jakarta.persistence.*;

@Entity
public class StudentProfile {

    @Id @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    private String name;
    private String alternateMobile;
    private String alternateEmail;
    private String address;
    private String fatherName;
    private String motherName;
    private String category;

    private boolean profileCompleted;
}


