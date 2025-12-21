package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.OtpVerification;
import com.mohit44790.admission.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    private static final int MAX_ATTEMPTS = 3;

    @Autowired
    private OtpRepository repo;

    @Autowired
    private EmailService emailService;

    // ---------------- SEND OTP ----------------
    public void sendOtp(String email) {

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        OtpVerification o = repo.findByEmail(email).orElse(new OtpVerification());
        o.setEmail(email);
        o.setOtp(otp);
        o.setAttempts(0);
        o.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        o.setLockedTill(null);

        repo.save(o);
        emailService.sendOtp(email, otp);
    }

    // ---------------- VERIFY OTP ----------------
    public void verify(String email, String otp) {

        OtpVerification o = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // 🔒 ACCOUNT LOCK CHECK
        if (o.getLockedTill() != null &&
                o.getLockedTill().isAfter(LocalDateTime.now())) {

            long minutes = java.time.Duration.between(
                    LocalDateTime.now(),
                    o.getLockedTill()
            ).toMinutes();

            throw new RuntimeException(
                    "Too many wrong attempts. Try again after " + minutes + " minutes"
            );
        }

        // ⏳ OTP EXPIRY CHECK
        if (o.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired. Please request a new OTP");
        }

        // ❌ WRONG OTP
        if (!o.getOtp().equals(otp)) {

            int usedAttempts = o.getAttempts() + 1;
            int remainingAttempts = MAX_ATTEMPTS - usedAttempts;

            o.setAttempts(usedAttempts);

            if (usedAttempts >= MAX_ATTEMPTS) {
                o.setLockedTill(LocalDateTime.now().plusMinutes(10));
                repo.save(o);

                throw new RuntimeException(
                        "Invalid OTP. You have used all attempts. Please try again after 10 minutes"
                );
            }

            repo.save(o);

            throw new RuntimeException(
                    "Invalid OTP. Attempts used: " + usedAttempts +
                            ", Remaining attempts: " + remainingAttempts
            );
        }

        // ✅ SUCCESS
        repo.delete(o);
    }
}
