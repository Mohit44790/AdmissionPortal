package com.mohit44790.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class College {
    @Id
    @GeneratedValue
    private Long id;
    private String collegeName;
}

