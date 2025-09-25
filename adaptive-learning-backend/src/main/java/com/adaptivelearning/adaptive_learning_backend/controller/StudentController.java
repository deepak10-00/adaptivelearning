package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.Course;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.repository.EnrollmentRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentController(UserRepository userRepository, EnrollmentRepository enrollmentRepository) {
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> getStudentDashboard() {
        return ResponseEntity.ok("Welcome to the Student Dashboard!");
    }

    @GetMapping("/courses")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Course>> getEnrolledCourses(Authentication authentication) {
        String email = authentication.getName();
        User student = userRepository.findByEmail(email).orElse(null);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        List<Course> courses = enrollmentRepository.findByStudent(student).stream()
                .map(enrollment -> enrollment.getCourse())
                .collect(Collectors.toList());

        return ResponseEntity.ok(courses);
    }
}
