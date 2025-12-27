package com.mohit44790.admission.controller;

import com.mohit44790.admission.dto.common.ApiResponse;
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

    // ================= STUDENT APIs =================

    @GetMapping("/programs")
    public ApiResponse<List<Program>> programs() {
        return new ApiResponse<>(
                true,
                "Programs fetched successfully",
                service.getPrograms()
        );
    }

    @GetMapping("/colleges")
    public ApiResponse<List<College>> colleges() {
        return new ApiResponse<>(
                true,
                "Colleges fetched successfully",
                service.getColleges()
        );
    }

    // Example: /courses/program/UG
    @GetMapping("/courses/program/{level}")
    public ApiResponse<List<Course>> coursesByProgram(
            @PathVariable ProgramLevel level) {

        return new ApiResponse<>(
                true,
                "Courses fetched for program " + level,
                service.getCoursesByProgram(level)
        );
    }

    // Example: /courses/program/UG/college/1
    @GetMapping("/courses/program/{level}/college/{collegeId}")
    public ApiResponse<List<Course>> coursesByProgramAndCollege(
            @PathVariable ProgramLevel level,
            @PathVariable Long collegeId) {

        return new ApiResponse<>(
                true,
                "Courses fetched for selected program & college",
                service.getCoursesByProgramAndCollege(level, collegeId)
        );
    }

    // ================= ADMIN APIs =================
    // ⚠️ Secure using ROLE_ADMIN in SecurityConfig

    @PostMapping("/admin/program")
    public ApiResponse<Program> addProgram(@RequestBody Program p) {
        return new ApiResponse<>(
                true,
                "Program added successfully",
                service.addProgram(p)
        );
    }

    @PutMapping("/admin/program/{id}")
    public ApiResponse<Program> updateProgram(
            @PathVariable Long id,
            @RequestBody Program p) {

        return new ApiResponse<>(
                true,
                "Program updated successfully",
                service.updateProgram(id, p)
        );
    }

    @DeleteMapping("/admin/program/{id}")
    public ApiResponse<Void> deleteProgram(@PathVariable Long id) {
        service.deleteProgram(id);
        return new ApiResponse<>(
                true,
                "Program deleted successfully",
                null
        );
    }

    @PostMapping("/admin/college")
    public ApiResponse<College> addCollege(@RequestBody College c) {
        return new ApiResponse<>(
                true,
                "College added successfully",
                service.addCollege(c)
        );
    }

    @PutMapping("/admin/college/{id}")
    public ApiResponse<College> updateCollege(
            @PathVariable Long id,
            @RequestBody College c) {

        return new ApiResponse<>(
                true,
                "College updated successfully",
                service.updateCollege(id, c)
        );
    }

    @DeleteMapping("/admin/college/{id}")
    public ApiResponse<Void> deleteCollege(@PathVariable Long id) {
        service.deleteCollege(id);
        return new ApiResponse<>(
                true,
                "College deleted successfully",
                null
        );
    }

    @PostMapping("/admin/course")
    public ApiResponse<Course> addCourse(@RequestBody Course c) {
        return new ApiResponse<>(
                true,
                "Course added successfully",
                service.addCourse(c)
        );
    }

    @PutMapping("/admin/course/{id}")
    public ApiResponse<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course c) {

        return new ApiResponse<>(
                true,
                "Course updated successfully",
                service.updateCourse(id, c)
        );
    }

    @DeleteMapping("/admin/course/{id}")
    public ApiResponse<Void> deleteCourse(@PathVariable Long id) {
        service.deleteCourse(id);
        return new ApiResponse<>(
                true,
                "Course deleted successfully",
                null
        );
    }
}
