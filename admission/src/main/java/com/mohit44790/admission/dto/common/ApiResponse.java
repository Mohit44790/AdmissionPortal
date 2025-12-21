package com.mohit44790.admission.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ApiResponse {
    private boolean success;
    private String message;
}

