package com.mohit44790.admission.repository;

import com.mohit44790.admission.entity.Program;
import com.mohit44790.admission.entity.ProgramLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgramRepository extends JpaRepository<Program, Long> {

    Optional<Program> findByLevel(ProgramLevel level);

}
