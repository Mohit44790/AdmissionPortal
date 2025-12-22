package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.College;
import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.repository.CollegeRepository;
import com.mohit44790.admission.repository.CourseRepository;
import com.mohit44790.admission.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramCollegeCourseService {

    @Autowired
    private ProgramRepository programRepo;
    @Autowired
    private CourseRepository courseRepo;
    @Autowired
    private CollegeRepository collegeRepo;

    // ---------- STUDENT APIs ----------
    public List<Program> getPrograms() {
        return programRepo.findAll();
    }

    public List<College> getColleges() {
        return collegeRepo.findAll();
    }

    public List<Course> getCourses(String level, Long collegeId) {
        return courseRepo.findByProgram_LevelAndCollege_Id(level, collegeId);
    }

    // ---------- ADMIN APIs ----------
    public Program saveProgram(Program p) {
        return programRepo.save(p);
    }

    public College saveCollege(College c) {
        return collegeRepo.save(c);
    }

    public Course saveCourse(Course c) {

        // safety validation
        Program p = programRepo.findById(c.getProgram().getId())
                .orElseThrow(() -> new RuntimeException("Invalid Program"));

        College clg = collegeRepo.findById(c.getCollege().getId())
                .orElseThrow(() -> new RuntimeException("Invalid College"));

        c.setProgram(p);
        c.setCollege(clg);

        return courseRepo.save(c);
    }
}
