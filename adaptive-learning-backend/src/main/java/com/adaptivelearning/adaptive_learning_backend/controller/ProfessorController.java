package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.entity.Role;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professors")
public class ProfessorController {

    private final UserRepository userRepository;

    public ProfessorController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('HOD') or hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllProfessors() {
        List<User> professors = userRepository.findByRole(Role.PROFESSOR);
        return ResponseEntity.ok(professors);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('HOD') or hasRole('ADMIN')")
    public ResponseEntity<User> getProfessorById(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.PROFESSOR)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('HOD') or hasRole('ADMIN')")
    public ResponseEntity<User> createProfessor(@RequestBody User professor) {
        professor.setRole(Role.PROFESSOR);
        User savedProfessor = userRepository.save(professor);
        return ResponseEntity.ok(savedProfessor);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HOD') or hasRole('ADMIN')")
    public ResponseEntity<User> updateProfessor(@PathVariable Long id, @RequestBody User professorDetails) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.PROFESSOR)
                .map(professor -> {
                    professor.setEmail(professorDetails.getEmail());
                    professor.setPassword(professorDetails.getPassword());
                    User updatedProfessor = userRepository.save(professor);
                    return ResponseEntity.ok(updatedProfessor);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HOD') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            userRepository.delete(userOpt.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<?> getCurrentProfessor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(403).body("Forbidden: User not found");
            }

            User user = userOpt.get();
            if (!user.getRole().equals(Role.PROFESSOR)) {
                return ResponseEntity.status(403).body("Forbidden: Role mismatch");
            }

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(403).body("Forbidden: Unknown principal type");
        }
    }
}
