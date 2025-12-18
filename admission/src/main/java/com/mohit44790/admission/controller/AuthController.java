package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.SignupRequest;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import com.mohit44790.admission.security.JwtUtil;
import com.mohit44790.admission.security.OtpUtil;
import com.mohit44790.admission.service.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;
    private final EmailService emailService;
    private final OtpUtil otpUtil;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder encoder;

    public AuthController(UserRepository repo,
                          EmailService emailService,
                          OtpUtil otpUtil,
                          JwtUtil jwtUtil,
                          PasswordEncoder encoder) {
        this.repo = repo;
        this.emailService = emailService;
        this.otpUtil = otpUtil;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    // SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest req) {

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Password & Confirm Password not match");
        }

        if (repo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setMobile(req.getMobile());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setEmailVerified(false);

        // OTP resend cooldown (60 seconds)
        if (user.getOtpLastSent() != null &&
                user.getOtpLastSent().isAfter(LocalDateTime.now().minusSeconds(60))) {
            throw new RuntimeException("Please wait before requesting OTP again");
        }

        String otp = otpUtil.generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        user.setOtpAttempts(0);
        user.setOtpLastSent(LocalDateTime.now());

        repo.save(user);
        emailService.sendOtp(user.getEmail(), otp);

        return "OTP sent to email";
    }

    // VERIFY OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> data) {

        User user = repo.findByEmail(data.get("email"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check attempts first
        if (user.getOtpAttempts() >= 3) {
            throw new RuntimeException("Too many wrong OTP attempts. Try again later");
        }

        // OTP correct & not expired
        if (user.getOtp().equals(data.get("otp")) &&
                user.getOtpExpiry().isAfter(LocalDateTime.now())) {

            user.setEmailVerified(true);
            user.setOtp(null);
            user.setOtpAttempts(0); // reset
            repo.save(user);
            return "OTP Verified";
        }

        // ❗ WRONG OTP CASE
        user.setOtpAttempts(user.getOtpAttempts() + 1);
        repo.save(user);

        throw new RuntimeException(
                "Invalid OTP. Attempts left: " + (3 - user.getOtpAttempts())
        );
    }

    //resend otp
    @PostMapping("/resend-otp")
    public String resendOtp(@RequestBody Map<String, String> data) {

        User user = repo.findByEmail(data.get("email"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtpLastSent() != null &&
                user.getOtpLastSent().isAfter(LocalDateTime.now().minusSeconds(60))) {
            throw new RuntimeException("Please wait 60 seconds before resending OTP");
        }

        String otp = otpUtil.generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        user.setOtpAttempts(0);
        user.setOtpLastSent(LocalDateTime.now());

        repo.save(user);
        emailService.sendOtp(user.getEmail(), otp);

        return "OTP resent successfully";
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> data) {

        User user = repo.findByEmail(data.get("email"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEmailVerified())
            throw new RuntimeException("Email not verified");

        if (!encoder.matches(data.get("password"), user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        String token = jwtUtil.generateToken(user.getEmail());
        return Map.of("token", token);
    }
}
