package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.Professor;
import com.adaptivelearning.adaptive_learning_backend.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public Professor saveProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public Optional<Professor> findByUserId(Long userId) {
        return professorRepository.findByUserId(userId);
    }
}
