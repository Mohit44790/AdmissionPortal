package com.mohit44790.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Course {
    @Id
    @GeneratedValue
    private Long id;
    private String courseName;

    @ManyToOne
    private Program program;
}

