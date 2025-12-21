package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.auth.JwtResponse;
import com.mohit44790.admission.dto.auth.LoginRequest;
import com.mohit44790.admission.dto.auth.OtpVerifyRequest;
import com.mohit44790.admission.dto.auth.SignupRequest;
import com.mohit44790.admission.dto.common.ApiResponse;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.service.AuthService;
import com.mohit44790.admission.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private OtpService otpService;

    @Autowired
    private UserRepository userRepo;

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody SignupRequest req) {
        String msg = service.signup(req);
        return new ApiResponse(true, msg);
    }

    // ---------- VERIFY OTP ----------
    @PostMapping("/verify-otp")
    public ApiResponse verify(@RequestBody OtpVerifyRequest r) {

        otpService.verify(r.getEmail(), r.getOtp());

        User u = userRepo.findByEmail(r.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        u.setVerified(true);
        userRepo.save(u);

        return new ApiResponse(true, "OTP verified successfully");
    }

    @PostMapping("/resend-otp")
    public ApiResponse resendOtp(@RequestParam String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        if (user.isVerified()) {
            return new ApiResponse(false, "User already verified. Please login");
        }

        otpService.sendOtp(email);
        return new ApiResponse(true, "OTP resent successfully");
    }



    // ---------- LOGIN ----------
    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}


