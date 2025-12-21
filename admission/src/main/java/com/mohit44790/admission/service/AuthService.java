package com.mohit44790.admission.service;

import com.mohit44790.admission.config.JwtTokenProvider;
import com.mohit44790.admission.dto.auth.JwtResponse;
import com.mohit44790.admission.dto.auth.LoginRequest;
import com.mohit44790.admission.dto.auth.SignupRequest;
import com.mohit44790.admission.entity.Role;
import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private OtpService otpService;

    @Autowired
    private JwtTokenProvider jwt;

    public String signup(SignupRequest req) {

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Password and Confirm Password do not match");
        }

        User existing = userRepo.findByEmail(req.getEmail()).orElse(null);

        // 🔹 USER EXISTS
        if (existing != null) {

            // ❌ VERIFIED → STOP
            if (existing.isVerified()) {
                return "User already registered and verified. Please login";
            }

            // 🔁 NOT VERIFIED → SEND OTP
            otpService.sendOtp(existing.getEmail());
            return "User already registered but not verified. OTP sent to email";
        }

        // 🆕 NEW USER
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setMobile(req.getMobile());
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole(Role.STUDENT);
        u.setVerified(false);

        userRepo.save(u);
        otpService.sendOtp(u.getEmail());

        return "User registered successfully. OTP sent to email";
    }



    public JwtResponse login(LoginRequest req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify OTP before login");
        }

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new JwtResponse(jwt.generateToken(user));
    }

}
