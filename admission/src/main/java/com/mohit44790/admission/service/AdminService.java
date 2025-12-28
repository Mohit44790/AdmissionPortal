package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.AdmissionStatus;
import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.StudentDocumentRepository;
import com.mohit44790.admission.repository.StudentProfileRepository;
import com.mohit44790.admission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StudentProfileRepository profileRepo;

    @Autowired
    private StudentDocumentRepository documentRepo;

    // 🔹 DASHBOARD COUNTS
    public long totalUsers() {
        return userRepo.count();
    }

    public long totalStudents() {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole().name().equals("STUDENT"))
                .count();
    }

    public long totalProfilesCompleted() {
        return profileRepo.findAll()
                .stream()
                .filter(p -> p.getCompletedStep() >= 5)
                .count();
    }

    // 🔹 GET ALL STUDENTS
    public List<User> getAllStudents() {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole().name().equals("STUDENT"))
                .toList();
    }

    // 🔹 STUDENT PROFILE
    public StudentProfile getStudentProfile(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // 🔹 STUDENT DOCUMENTS
    public List<StudentDocument> getStudentDocuments(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = profileRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return documentRepo.findByStudentProfile(profile);
    }

    // AdminService.java (add methods)

    public StudentProfile decideAdmission(Long userId,
                                          AdmissionStatus status,
                                          String remark) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = profileRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getCompletedStep() < 5) {
            throw new RuntimeException("Profile not completed");
        }

        profile.setAdmissionStatus(status);
        profile.setAdminRemark(remark);

        return profileRepo.save(profile);
    }

    @Autowired
    private EmailService emailService;

    public StudentProfile decideAdmission(Long userId,
                                          AdmissionStatus status,
                                          String remark) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = profileRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setAdmissionStatus(status);
        profile.setAdminRemark(remark);

        profileRepo.save(profile);

        // 📧 EMAIL
        emailService.sendAdmissionStatus(
                user.getEmail(),
                status.name(),
                remark
        );

        return profile;
    }


}
