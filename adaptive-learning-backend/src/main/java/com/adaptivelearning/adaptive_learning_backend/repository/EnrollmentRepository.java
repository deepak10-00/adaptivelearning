package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.Enrollment;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // Find all enrollments for a specific student
    List<Enrollment> findByStudent(User student);
}
