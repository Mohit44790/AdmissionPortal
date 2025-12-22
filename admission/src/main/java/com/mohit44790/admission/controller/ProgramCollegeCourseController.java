package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.College;
import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.service.ProgramCollegeCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master")
public class ProgramCollegeCourseController {

    @Autowired
    private ProgramCollegeCourseService service;

    // ======== STUDENT APIs ========

    @GetMapping("/programs")
    public List<Program> programs() {
        return service.getPrograms();
    }

    @GetMapping("/colleges")
    public List<College> colleges() {
        return service.getColleges();
    }

    // Student selects Program + College
    @GetMapping("/courses")
    public List<Course> courses(@RequestParam String level,
                                @RequestParam Long collegeId) {
        return service.getCourses(level, collegeId);
    }

    // ======== ADMIN APIs ========

    @PostMapping("/admin/program")
    public Program addProgram(@RequestBody Program p) {
        return service.saveProgram(p);
    }

    @PostMapping("/admin/college")
    public College addCollege(@RequestBody College c) {
        return service.saveCollege(c);
    }

    @PostMapping("/admin/course")
    public Course addCourse(@RequestBody Course c) {
        return service.saveCourse(c);
    }
}
