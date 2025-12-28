package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.common.ApiResponse;
import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

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
    public ApiResponse<List<User>> getAllStudents() {
        return new ApiResponse<>(
                true,
                "Students fetched",
                adminService.getAllStudents()
        );
    }

    // ================= STUDENT PROFILE =================

    @GetMapping("/student/{userId}/profile")
    public ApiResponse<StudentProfile> getStudentProfile(
            @PathVariable Long userId) {

        return new ApiResponse<>(
                true,
                "Student profile fetched",
                adminService.getStudentProfile(userId)
        );
    }

    // ================= STUDENT DOCUMENTS =================

    @GetMapping("/student/{userId}/documents")
    public ApiResponse<List<StudentDocument>> getStudentDocuments(
            @PathVariable Long userId) {

        return new ApiResponse<>(
                true,
                "Student documents fetched",
                adminService.getStudentDocuments(userId)
        );
    }
}
