package com.mohit44790.admission.dto.student;

import lombok.Data;

@Data
public class BankDetailsRequest {
    private String bankName;
    private String accountNumber;
    private String ifsc;
}
