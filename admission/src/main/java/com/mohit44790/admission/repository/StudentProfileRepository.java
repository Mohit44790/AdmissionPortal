package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.AdmissionStatus;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
    List<StudentProfile> findByAdmissionStatusAndCourse_College_IdOrderByPercentageDesc(
            AdmissionStatus status,
            Long collegeId
    );

}
