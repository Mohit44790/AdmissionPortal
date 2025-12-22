package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.College;
import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.entity.ProgramLevel;
import com.mohit44790.admission.repository.CollegeRepository;
import com.mohit44790.admission.repository.CourseRepository;
import com.mohit44790.admission.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramCollegeCourseService {

    @Autowired private ProgramRepository programRepo;
    @Autowired private CourseRepository courseRepo;
    @Autowired private CollegeRepository collegeRepo;

    // ---------------- STUDENT ----------------

    public List<Program> getPrograms() {
        return programRepo.findAll();
    }

    public List<College> getColleges() {
        return collegeRepo.findAll();
    }

    // UG -> all UG courses (all colleges)
    public List<Course> getCoursesByProgram(ProgramLevel level) {
        return courseRepo.findByProgram_Level(level);
    }

    // UG + College
    public List<Course> getCoursesByProgramAndCollege(ProgramLevel level, Long collegeId) {
        return courseRepo.findByProgram_LevelAndCollege_Id(level, collegeId);
    }

    // ---------------- ADMIN ----------------

    // PROGRAM
    public Program addProgram(Program p) {
        return programRepo.save(p);
    }

    public Program updateProgram(Long id, Program p) {
        Program db = programRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
        db.setLevel(p.getLevel());
        return programRepo.save(db);
    }

    public void deleteProgram(Long id) {
        programRepo.deleteById(id);
    }

    // COLLEGE
    public College addCollege(College c) {
        return collegeRepo.save(c);
    }

    public College updateCollege(Long id, College c) {
        College db = collegeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found"));
        db.setCollegeName(c.getCollegeName());
        return collegeRepo.save(db);
    }

    public void deleteCollege(Long id) {
        collegeRepo.deleteById(id);
    }

    // COURSE
    public Course addCourse(Course c) {
        Program p = programRepo.findById(c.getProgram().getId())
                .orElseThrow(() -> new RuntimeException("Invalid Program"));
        College clg = collegeRepo.findById(c.getCollege().getId())
                .orElseThrow(() -> new RuntimeException("Invalid College"));

        c.setProgram(p);
        c.setCollege(clg);
        return courseRepo.save(c);
    }

    public Course updateCourse(Long id, Course c) {
        Course db = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        db.setCourseName(c.getCourseName());
        db.setProgram(c.getProgram());
        db.setCollege(c.getCollege());

        return courseRepo.save(db);
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }
}

