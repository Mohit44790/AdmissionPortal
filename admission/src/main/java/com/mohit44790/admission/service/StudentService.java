package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.Student;
import com.mohit44790.admission.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student save(Student student) {
        student.setStatus("APPLIED");
        return repository.save(student);
    }

    public List<Student> getAll() {
        return repository.findAll();
    }
}

