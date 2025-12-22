package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.repository.CourseRepository;
import com.mohit44790.admission.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramCourseService {

    @Autowired
    private ProgramRepository programRepo;

    @Autowired
    private CourseRepository courseRepo;

    // 🔹 All Programs
    public List<Program> getAllPrograms() {
        return programRepo.findAll();
    }

    // 🔹 Courses by Program Level (10 / 12 / UG / PG)
    public List<Course> getCoursesByLevel(String level) {
        return courseRepo.findByProgram_Level(level);
    }

    // 🔹 Add Program (Admin use)
    public Program saveProgram(Program program) {
        return programRepo.save(program);
    }

    // 🔹 Add Course (Admin use)
    public Course saveCourse(Course course) {
        return courseRepo.save(course);
    }
}
