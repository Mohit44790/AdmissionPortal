package com.mohit44790.admission.dto.admin;


import com.mohit44790.admission.entity.AdmissionStatus;
import lombok.Data;

@Data
public class AdmissionDecisionRequest {
    private AdmissionStatus status; // APPROVED / REJECTED
    private String remark;           // optional
}

