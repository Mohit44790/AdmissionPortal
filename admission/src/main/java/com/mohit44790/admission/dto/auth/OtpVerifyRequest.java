package com.mohit44790.admission.dto.auth;



import lombok.Data;

@Data
public class OtpVerifyRequest {

    private String email;
    private String otp;
}

