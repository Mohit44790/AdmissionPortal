package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.admin.AdmissionDecisionRequest;
import com.mohit44790.admission.dto.common.ApiResponse;
import com.mohit44790.admission.entity.*;
import com.mohit44790.admission.repository.PaymentRepository;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    // ================= DASHBOARD =================
    @GetMapping("/dashboard")
    public ApiResponse<Map<String, Object>> dashboard() {

        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", adminService.totalUsers());
        data.put("totalStudents", adminService.totalStudents());
        data.put("profilesCompleted", adminService.totalProfilesCompleted());

        return new ApiResponse<>(true, "Admin dashboard data", data);
    }

    // ================= STUDENTS =================
    @GetMapping("/students")
    public ApiResponse<List<User>> students() {
        return new ApiResponse<>(
                true,
                "Students fetched",
                adminService.getAllStudents()
        );
    }

    @GetMapping("/student/{userId}/profile")
    public ApiResponse<StudentProfile> profile(@PathVariable Long userId) {
        return new ApiResponse<>(
                true,
                "Student profile fetched",
                adminService.getStudentProfile(userId)
        );
    }

    @GetMapping("/student/{userId}/documents")
    public ApiResponse<List<StudentDocument>> documents(@PathVariable Long userId) {
        return new ApiResponse<>(
                true,
                "Student documents fetched",
                adminService.getStudentDocuments(userId)
        );
    }

    // ================= ADMISSION DECISION =================
    @PostMapping("/student/{userId}/decision")
    public ApiResponse<StudentProfile> decide(
            @PathVariable Long userId,
            @RequestBody AdmissionDecisionRequest req,
            Principal principal) {

        User admin = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return new ApiResponse<>(
                true,
                "Admission status updated",
                adminService.decideAdmission(
                        userId,
                        req.getStatus(),
                        req.getRemark(),
                        admin
                )
        );
    }

    // ================= REVIEW HISTORY =================
    @GetMapping("/student/{userId}/reviews")
    public ApiResponse<List<AdmissionReview>> reviewHistory(
            @PathVariable Long userId) {

        StudentProfile profile = adminService.getStudentProfile(userId);

        return new ApiResponse<>(
                true,
                "Admission review history",
                adminService.getReviewHistory(profile)
        );
    }

    // ================= PAYMENTS REPORT =================
    @GetMapping("/payments")
    public ApiResponse<List<Payment>> allPayments(
            @RequestParam(required = false) PaymentStatus status) {

        List<Payment> data = (status == null)
                ? paymentRepo.findAll()
                : paymentRepo.findByStatus(status);

        return new ApiResponse<>(true, "Payment report", data);
    }
}
