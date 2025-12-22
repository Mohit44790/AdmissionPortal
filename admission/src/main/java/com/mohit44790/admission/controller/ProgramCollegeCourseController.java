package com.mohit44790.admission.controller;

import com.mohit44790.admission.entity.College;
import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.entity.ProgramLevel;
import com.mohit44790.admission.service.ProgramCollegeCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master")
public class ProgramCollegeCourseController {

    @Autowired
    private ProgramCollegeCourseService service;

    // ---------- STUDENT ----------

    @GetMapping("/programs")
    public List<Program> programs() {
        return service.getPrograms();
    }

    @GetMapping("/colleges")
    public List<College> colleges() {
        return service.getColleges();
    }

    // UG -> all UG courses in all colleges
    @GetMapping("/courses/program/{level}")
    public List<Course> coursesByProgram(@PathVariable ProgramLevel level) {
        return service.getCoursesByProgram(level);
    }

    // UG + College
    @GetMapping("/courses/program/{level}/college/{collegeId}")
    public List<Course> coursesByProgramAndCollege(
            @PathVariable ProgramLevel level,
            @PathVariable Long collegeId) {
        return service.getCoursesByProgramAndCollege(level, collegeId);
    }

    // ---------- ADMIN ----------

    @PostMapping("/admin/program")
    public Program addProgram(@RequestBody Program p) {
        return service.addProgram(p);
    }

    @PutMapping("/admin/program/{id}")
    public Program updateProgram(@PathVariable Long id, @RequestBody Program p) {
        return service.updateProgram(id, p);
    }

    @DeleteMapping("/admin/program/{id}")
    public void deleteProgram(@PathVariable Long id) {
        service.deleteProgram(id);
    }

    @PostMapping("/admin/college")
    public College addCollege(@RequestBody College c) {
        return service.addCollege(c);
    }

    @PutMapping("/admin/college/{id}")
    public College updateCollege(@PathVariable Long id, @RequestBody College c) {
        return service.updateCollege(id, c);
    }

    @DeleteMapping("/admin/college/{id}")
    public void deleteCollege(@PathVariable Long id) {
        service.deleteCollege(id);
    }

    @PostMapping("/admin/course")
    public Course addCourse(@RequestBody Course c) {
        return service.addCourse(c);
    }

    @PutMapping("/admin/course/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course c) {
        return service.updateCourse(id, c);
    }

    @DeleteMapping("/admin/course/{id}")
    public void deleteCourse(@PathVariable Long id) {
        service.deleteCourse(id);
    }
}
