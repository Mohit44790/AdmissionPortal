package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.Student;
import com.mohit44790.admission.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping
    public Student apply(@RequestBody Student student) {
        return service.save(student);
    }

    @GetMapping
    public List<Student> list() {
        return service.getAll();
    }
}

