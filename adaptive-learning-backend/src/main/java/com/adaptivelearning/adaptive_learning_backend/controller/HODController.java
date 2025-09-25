package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.Course;
import com.adaptivelearning.adaptive_learning_backend.entity.Hod;
import com.adaptivelearning.adaptive_learning_backend.repository.CourseRepository;
import com.adaptivelearning.adaptive_learning_backend.service.HodService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hod")
public class HODController {

    private final CourseRepository courseRepository;
    private final HodService hodService;

    public HODController(CourseRepository courseRepository, HodService hodService) {
        this.courseRepository = courseRepository;
        this.hodService = hodService;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('HOD')")
    public ResponseEntity<String> getHODDashboard() {
        return ResponseEntity.ok("Welcome to the Head of Department Dashboard");
    }

    @GetMapping("/courses")
    @PreAuthorize("hasRole('HOD')")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/courses")
    @PreAuthorize("hasRole('HOD')")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }

    @GetMapping("/profile/{userId}")
    @PreAuthorize("hasRole('HOD')")
    public ResponseEntity<?> getHodProfile(@PathVariable Long userId) {
        return hodService.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/assign-codes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> assignCodesToExistingHods() {
        hodService.assignCodesToExistingHods();
        return ResponseEntity.ok("Unique codes assigned to HODs.");
    }
}
