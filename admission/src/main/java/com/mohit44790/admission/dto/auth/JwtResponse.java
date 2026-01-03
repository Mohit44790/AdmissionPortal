package com.mohit44790.admission.dto.auth;


import com.mohit44790.admission.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private String token;

    private String name;
    private String email;
    private String mobile;
    private Role role;
}

