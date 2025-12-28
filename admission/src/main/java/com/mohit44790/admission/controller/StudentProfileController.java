package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.common.ApiResponse;
import com.mohit44790.admission.dto.student.*;
import com.mohit44790.admission.entity.StudentProfile;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.StudentProfileService;
import com.mohit44790.admission.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/student/profile")
public class StudentProfileController {

    @Autowired
    private StudentProfileService service;

    @Autowired
    private UserRepository userRepo;

    // 🔹 COMMON METHOD
    private StudentProfile getProfile(Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.getOrCreate(user);
    }

    // ✅ GET PROFILE (EMAIL + MOBILE PREFILLED)
    @GetMapping
    public StudentProfileResponse getProfileData(Principal principal) {
        User user = userRepo.findByEmail(principal.getName()).orElseThrow();
        StudentProfile profile = service.getOrCreate(user);

        StudentProfileResponse res = new StudentProfileResponse();
        res.setEmail(user.getEmail());
        res.setMobile(user.getMobile());
        res.setProfile(profile);

        return res;
    }

    // 1️⃣ PERSONAL DETAILS
    @PostMapping("/personal")
    public String personal(@RequestBody PersonalDetailsRequest req, Principal p) {
        StudentProfile profile = getProfile(p);

        profile.setFullName(req.getFullName());
        profile.setAlternatePhone(req.getAlternatePhone());
        profile.setAlternateEmail(req.getAlternateEmail());
        profile.setGender(req.getGender());
        profile.setDob(req.getDob());

        service.save(profile, 1);
        return "Personal details saved";
    }

    // 2️⃣ FAMILY DETAILS
    @PostMapping("/family")
    public String family(@RequestBody FamilyDetailsRequest req, Principal p) {
        StudentProfile profile = getProfile(p);

        profile.setFatherName(req.getFatherName());
        profile.setMotherName(req.getMotherName());
        profile.setFamilyIncome(req.getFamilyIncome());

        service.save(profile, 2);
        return "Family details saved";
    }

    // 3️⃣ BANK DETAILS
    @PostMapping("/bank")
    public String bank(@RequestBody BankDetailsRequest req, Principal p) {
        StudentProfile profile = getProfile(p);

        profile.setBankName(req.getBankName());
        profile.setAccountNumber(req.getAccountNumber());
        profile.setIfsc(req.getIfsc());

        service.save(profile, 3);
        return "Bank details saved";
    }

    // 4️⃣ CATEGORY / QUOTA
    @PostMapping("/category")
    public String category(@RequestBody CategoryRequest req, Principal p) {
        StudentProfile profile = getProfile(p);

        profile.setCategory(req.getCategory());
        profile.setCaste(req.getCaste());
        profile.setQuota(req.getQuota());

        service.save(profile, 4);
        return "Category details saved";
    }

    // 5️⃣ OTHER DETAILS
    @PostMapping("/other")
    public String other(@RequestBody OtherDetailsRequest req, Principal p) {
        StudentProfile profile = getProfile(p);

        profile.setNationality(req.getNationality());
        profile.setReligion(req.getReligion());
        profile.setDisability(req.getDisability());

        service.save(profile, 5);
        return "Other details saved";
    }

    // StudentProfileController.java (add)

    @GetMapping("/status")
    public ApiResponse<Map<String, Object>> admissionStatus(Principal principal) {

        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow();

        StudentProfile profile = service.getOrCreate(user);

        Map<String, Object> data = new HashMap<>();
        data.put("status", profile.getAdmissionStatus());
        data.put("remark", profile.getAdminRemark());

        return new ApiResponse<>(true, "Admission status", data);
    }

}


