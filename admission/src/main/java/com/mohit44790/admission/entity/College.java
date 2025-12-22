package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String collegeName;
}
