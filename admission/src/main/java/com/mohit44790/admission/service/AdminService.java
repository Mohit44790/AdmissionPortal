package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.*;
import com.mohit44790.admission.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StudentProfileRepository profileRepo;

    @Autowired
    private StudentDocumentRepository documentRepo;

    @Autowired
    private AdmissionReviewRepository reviewRepo;

    @Autowired
    private EmailService emailService;

    // ================= DASHBOARD =================

    public long totalUsers() {
        return userRepo.count();
    }

    public long totalStudents() {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole() == Role.STUDENT)
                .count();
    }

    public long totalProfilesCompleted() {
        return profileRepo.findAll()
                .stream()
                .filter(p -> p.getCompletedStep() >= 5)
                .count();
    }

    // ================= STUDENTS =================

    public List<User> getAllStudents() {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole() == Role.STUDENT)
                .toList();
    }

    public StudentProfile getStudentProfile(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public List<StudentDocument> getStudentDocuments(Long userId) {

        StudentProfile profile = getStudentProfile(userId);
        return documentRepo.findByStudentProfile(profile);
    }

    // ================= ADMISSION DECISION =================

    public StudentProfile decideAdmission(Long userId,
                                          AdmissionStatus status,
                                          String remark,
                                          User adminUser) {

        StudentProfile profile = getStudentProfile(userId);

        if (profile.getCompletedStep() < 5) {
            throw new RuntimeException("Profile not completed");
        }

        // ✅ Update profile
        profile.setAdmissionStatus(status);
        profile.setAdminRemark(remark);
        profileRepo.save(profile);

        // ✅ Save review history
        AdmissionReview review = new AdmissionReview();
        review.setAdmin(adminUser);
        review.setStudentProfile(profile);
        review.setStatus(status);
        review.setRemark(remark);
        review.setReviewedAt(LocalDateTime.now());

        reviewRepo.save(review);

        // ✅ Send email
        emailService.sendAdmissionStatus(
                profile.getUser().getEmail(),
                status.name(),
                remark
        );

        return profile;
    }
    public List<AdmissionReview> getReviewHistory(StudentProfile profile) {
        return reviewRepo.findByStudentProfile(profile);
    }

}
