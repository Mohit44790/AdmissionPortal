package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByProgram_Level(String level);
}
