package com.mohit44790.admission.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 10, 12, UG, PG
    @Column(nullable = false, unique = true)
    private String level;
}
