package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.User;
import com.mohit44790.admission.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository repo;

    public ProfileController(UserRepository repo) {
        this.repo = repo;
    }

    // FETCH PROFILE (email + mobile auto)
    @GetMapping
    public User getProfile(Principal principal) {
        return repo.findByEmail(principal.getName())
                .orElseThrow();
    }

    // UPDATE PROFILE
    @PostMapping
    public String updateProfile(@RequestBody User updated,
                                Principal principal) {

        User user = repo.findByEmail(principal.getName())
                .orElseThrow();

        user.setAddress(updated.getAddress());
        user.setCourse(updated.getCourse());
        user.setGender(updated.getGender());

        repo.save(user);
        return "Profile updated";
    }
}
