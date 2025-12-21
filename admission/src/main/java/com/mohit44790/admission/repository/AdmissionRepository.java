package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.AdmissionApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepository extends JpaRepository<AdmissionApplication,Long> {}

