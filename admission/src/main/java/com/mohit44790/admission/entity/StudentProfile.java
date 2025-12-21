package com.mohit44790.admission.entity;


import jakarta.persistence.*;

@Entity
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private String name;
    private String alternateMobile;
    private String address;
    private boolean profileCompleted;

    // getters & setters
}

