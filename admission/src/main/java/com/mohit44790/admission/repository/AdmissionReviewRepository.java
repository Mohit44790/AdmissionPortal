package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.AdmissionReview;
import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdmissionReviewRepository
        extends JpaRepository<AdmissionReview, Long> {

    List<AdmissionReview> findByStudentProfile(StudentProfile profile);
}
