package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.Payment;
import com.mohit44790.admission.entity.PaymentStatus;
import com.mohit44790.admission.repository.PaymentRepository;
import com.mohit44790.admission.service.PdfService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/webhook")
public class PaymentWebhookController {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private PdfService pdfService;

    // 🔐 Webhook secret (set in application.properties)
    @Value("${payment.webhook.secret}")
    private String webhookSecret;

    /**
     * Generic webhook endpoint
     * Works for Razorpay / Cashfree-like payloads
     */
    @PostMapping("/payment")
    public ResponseEntity<String> handlePaymentWebhook(
            @RequestBody Map<String, Object> payload) {

        String orderId = (String) payload.get("order_id");
        String paymentId = (String) payload.get("payment_id");
        String status = ((String) payload.get("status")).toUpperCase();

        Payment payment = paymentRepo.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.PAID) {
            return ResponseEntity.ok("Already processed");
        }

        if ("SUCCESS".equals(status) || "PAID".equals(status)) {
            payment.setStatus(PaymentStatus.PAID);
            payment.setTransactionId(paymentId);
            payment.setUpdatedAt(LocalDateTime.now());

            pdfService.generateAdmissionLetter(payment.getStudentProfile());
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        paymentRepo.save(payment);
        return ResponseEntity.ok("OK");
    }


    // ================= SIGNATURE VERIFICATION =================

    private boolean verifySignature(String payload, String actualSignature, String secret)
            throws Exception {

        if (actualSignature == null || actualSignature.isBlank()) {
            return false;
        }

        String expectedSignature = hmacSha256(payload, secret);
        return MessageDigest.isEqual(
                expectedSignature.getBytes(StandardCharsets.UTF_8),
                actualSignature.getBytes(StandardCharsets.UTF_8)
        );
    }

    private String hmacSha256(String data, String key) throws Exception {

        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey =
                new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        mac.init(secretKey);
        byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        return bytesToHex(rawHmac);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder hex = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}
