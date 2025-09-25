package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByUserId(Long userId);
}
