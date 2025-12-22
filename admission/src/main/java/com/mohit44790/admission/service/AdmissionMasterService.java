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
public class AdmissionMasterService {

    @Autowired
    private ProgramRepository programRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private CollegeRepository collegeRepo;

    // 🔹 Programs
    public List<Program> getPrograms() {
        return programRepo.findAll();
    }

    // 🔹 Colleges
    public List<College> getColleges() {
        return collegeRepo.findAll();
    }

    // 🔹 Courses (Program + College)
    public List<Course> getCourses(String level, Long collegeId) {
        return courseRepo.findByProgram_LevelAndCollege_Id(level, collegeId);
    }

    // 🔐 ADMIN USE
    public Program saveProgram(Program p) {
        return programRepo.save(p);
    }

    public College saveCollege(College c) {
        return collegeRepo.save(c);
    }

    public Course saveCourse(Course c) {
        return courseRepo.save(c);
    }
}
