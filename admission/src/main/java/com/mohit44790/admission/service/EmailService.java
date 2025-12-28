package com.mohit44790.admission.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    // OTP EMAIL
    public void sendOtp(String to, String otp) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Admission Portal | OTP Verification");

            Context context = new Context();
            context.setVariable("otp", otp);

            String htmlContent =
                    templateEngine.process("otp-email", context);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    // ADMISSION STATUS EMAIL
    public void sendAdmissionStatus(String to,
                                    String status,
                                    String remark) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject("Admission Status Update");

        mail.setText("""
        Dear Candidate,

        Your admission status has been updated.

        Status: %s
        Remark: %s

        Regards,
        Admission Office
        """.formatted(status, remark));

        mailSender.send(mail);
    }
}
