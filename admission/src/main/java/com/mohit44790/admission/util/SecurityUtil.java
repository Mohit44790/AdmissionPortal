package com.mohit44790.admission.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    // 🔐 GET LOGGED-IN USER EMAIL
    public static String getCurrentUserEmail() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }

        return auth.getName(); // email
    }

    // 👤 CHECK IF USER HAS ROLE
    public static boolean hasRole(String role) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) return false;

        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ROLE_" + role));
    }

    // 👑 ADMIN CHECK
    public static boolean isAdmin() {
        return hasRole("ADMIN");
    }

    // 🎓 STUDENT CHECK
    public static boolean isStudent() {
        return hasRole("STUDENT");
    }
}
