package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.service.ProgramCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProgramCourseController {

    @Autowired
    private ProgramCourseService service;

    // ✅ GET ALL PROGRAMS
    @GetMapping("/programs")
    public List<Program> getPrograms() {
        return service.getAllPrograms();
    }

    // ✅ GET COURSES BY PROGRAM LEVEL
    @GetMapping("/courses/{level}")
    public List<Course> getCourses(@PathVariable String level) {
        return service.getCoursesByLevel(level);
    }

    // 🔐 ADMIN ONLY (optional)
    @PostMapping("/program")
    public Program addProgram(@RequestBody Program program) {
        return service.saveProgram(program);
    }

    // 🔐 ADMIN ONLY (optional)
    @PostMapping("/course")
    public Course addCourse(@RequestBody Course course) {
        return service.saveCourse(course);
    }
}
