package com.mohit44790.admission.dto.student;

import lombok.Data;

@Data
public class PersonalDetailsRequest {
    private String fullName;
    private String alternatePhone;
    private String alternateEmail;
    private String gender;
    private String dob;
}

