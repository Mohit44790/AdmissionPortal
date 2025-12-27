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
    @Autowired private CollegeRepository collegeRepo;
    @Autowired private CourseRepository courseRepo;

    // ================= STUDENT =================

    public List<Program> getPrograms() {
        return programRepo.findAll();
    }

    public List<College> getColleges() {
        return collegeRepo.findAll();
    }

    public List<Course> getCoursesByProgram(ProgramLevel level) {
        return courseRepo.findByProgram_Level(level);
    }

    public List<Course> getCoursesByProgramAndCollege(
            ProgramLevel level, Long collegeId) {
        return courseRepo.findByProgram_LevelAndCollege_Id(level, collegeId);
    }

    // ================= ADMIN =================

    // -------- PROGRAM --------
    public Program addProgram(Program p) {

        programRepo.findByLevel(p.getLevel())
                .ifPresent(x -> {
                    throw new RuntimeException("Program level already exists");
                });

        return programRepo.save(p);
    }

    public Program updateProgram(Long id, Program updated) {

        Program existing = programRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));

        programRepo.findByLevel(updated.getLevel())
                .ifPresent(p -> {
                    if (!p.getId().equals(id)) {
                        throw new RuntimeException("Program level already exists");
                    }
                });

        existing.setLevel(updated.getLevel());
        return programRepo.save(existing);
    }

    public void deleteProgram(Long id) {

        long count = courseRepo.countByProgram_Id(id);

        if (count > 0) {
            throw new RuntimeException(
                    "Cannot delete program. Courses exist under this program"
            );
        }

        programRepo.deleteById(id);
    }

    // -------- COLLEGE --------
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

        long count = courseRepo.countByCollege_Id(id);

        if (count > 0) {
            throw new RuntimeException(
                    "Cannot delete college. Courses exist under this college"
            );
        }

        collegeRepo.deleteById(id);
    }

    // -------- COURSE --------
    public Course addCourse(Course c) {

        Program program = programRepo.findById(c.getProgram().getId())
                .orElseThrow(() -> new RuntimeException("Invalid Program"));

        College college = collegeRepo.findById(c.getCollege().getId())
                .orElseThrow(() -> new RuntimeException("Invalid College"));

        c.setProgram(program);
        c.setCollege(college);

        return courseRepo.save(c);
    }

    public Course updateCourse(Long id, Course c) {

        Course db = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Program program = programRepo.findById(c.getProgram().getId())
                .orElseThrow(() -> new RuntimeException("Invalid Program"));

        College college = collegeRepo.findById(c.getCollege().getId())
                .orElseThrow(() -> new RuntimeException("Invalid College"));

        db.setCourseName(c.getCourseName());
        db.setProgram(program);
        db.setCollege(college);

        return courseRepo.save(db);
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }
}



