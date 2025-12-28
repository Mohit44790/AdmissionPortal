package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.common.ApiResponse;
import com.mohit44790.admission.dto.student.*;
import com.mohit44790.admission.entity.Payment;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.PaymentRepository;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.PaymentService;
import com.mohit44790.admission.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentProfileController {

    @Autowired
    private StudentProfileService service;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PaymentRepository paymentRepo;

    // 🔹 COMMON
    private StudentProfile getProfile(Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.getOrCreate(user);
    }

    // ================= PROFILE =================
    @GetMapping("/profile")
    public StudentProfileResponse getProfileData(Principal principal) {

        User user = userRepo.findByEmail(principal.getName()).orElseThrow();
        StudentProfile profile = service.getOrCreate(user);

        StudentProfileResponse res = new StudentProfileResponse();
        res.setEmail(user.getEmail());
        res.setMobile(user.getMobile());
        res.setProfile(profile);

        return res;
    }

    @PostMapping("/profile/personal")
    public ApiResponse<?> personal(@RequestBody PersonalDetailsRequest req, Principal p) {

        StudentProfile profile = getProfile(p);
        profile.setFullName(req.getFullName());
        profile.setAlternatePhone(req.getAlternatePhone());
        profile.setAlternateEmail(req.getAlternateEmail());
        profile.setGender(req.getGender());
        profile.setDob(req.getDob());

        service.save(profile, 1);
        return new ApiResponse<>(true, "Personal details saved", null);
    }

    @PostMapping("/profile/family")
    public ApiResponse<?> family(@RequestBody FamilyDetailsRequest req, Principal p) {

        StudentProfile profile = getProfile(p);
        profile.setFatherName(req.getFatherName());
        profile.setMotherName(req.getMotherName());
        profile.setFamilyIncome(req.getFamilyIncome());

        service.save(profile, 2);
        return new ApiResponse<>(true, "Family details saved", null);
    }

    @PostMapping("/profile/bank")
    public ApiResponse<?> bank(@RequestBody BankDetailsRequest req, Principal p) {

        StudentProfile profile = getProfile(p);
        profile.setBankName(req.getBankName());
        profile.setAccountNumber(req.getAccountNumber());
        profile.setIfsc(req.getIfsc());

        service.save(profile, 3);
        return new ApiResponse<>(true, "Bank details saved", null);
    }

    @PostMapping("/profile/category")
    public ApiResponse<?> category(@RequestBody CategoryRequest req, Principal p) {

        StudentProfile profile = getProfile(p);
        profile.setCategory(req.getCategory());
        profile.setCaste(req.getCaste());
        profile.setQuota(req.getQuota());

        service.save(profile, 4);
        return new ApiResponse<>(true, "Category details saved", null);
    }

    @PostMapping("/profile/other")
    public ApiResponse<?> other(@RequestBody OtherDetailsRequest req, Principal p) {

        StudentProfile profile = getProfile(p);
        profile.setNationality(req.getNationality());
        profile.setReligion(req.getReligion());
        profile.setDisability(req.getDisability());

        service.save(profile, 5);
        return new ApiResponse<>(true, "Other details saved", null);
    }

    // ================= ADMISSION STATUS =================
    @GetMapping("/admission/status")
    public ApiResponse<Map<String, Object>> admissionStatus(Principal principal) {

        StudentProfile profile = getProfile(principal);

        Map<String, Object> data = new HashMap<>();
        data.put("status", profile.getAdmissionStatus());
        data.put("remark", profile.getAdminRemark());

        return new ApiResponse<>(true, "Admission status", data);
    }

    // ================= PAYMENT =================
    @PostMapping("/payment/create")
    public ApiResponse<?> createPayment(Principal principal) {

        StudentProfile profile = getProfile(principal);

        return new ApiResponse<>(
                true,
                "Payment order created",
                paymentService.createOrder(profile.getId())
        );
    }

    @GetMapping("/payments")
    public ApiResponse<List<Payment>> paymentHistory(Principal principal) {

        StudentProfile profile = getProfile(principal);

        return new ApiResponse<>(
                true,
                "Payment history",
                paymentRepo.findByStudentProfile(profile)
        );
    }


}
