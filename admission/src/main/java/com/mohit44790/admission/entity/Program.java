package com.mohit44790.admission.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Program {
    @Id
    @GeneratedValue
    private Long id;
    private String level; // 10,12,UG,PG
}

