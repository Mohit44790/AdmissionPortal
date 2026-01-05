package com.mohit44790.admission.dto.student;

import com.mohit44790.admission.entity.StudentDocument;
import com.mohit44790.admission.entity.StudentProfile;
import lombok.Data;

import java.util.List;

@Data
public class StudentProfileResponse {

    private String email;
    private String mobile;

    private StudentProfile profile;
    private List<StudentDocument> documents;
}

