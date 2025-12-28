package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Course;
import com.mohit44790.admission.entity.ProgramLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // ✅ Program wise (UG / PG / DIPLOMA etc.)
    List<Course> findByProgram_Level(ProgramLevel level);

    // ✅ Program + College wise
    List<Course> findByProgram_LevelAndCollege_Id(
            ProgramLevel level,
            Long collegeId
    );

    // ✅ College wise
    List<Course> findByCollege_Id(Long collegeId);

    // ✅ SAFETY CHECKS (DELETE VALIDATION)

    // Before deleting Program
    long countByProgram_Id(Long programId);

    // Before deleting College
    long countByCollege_Id(Long collegeId);
}
