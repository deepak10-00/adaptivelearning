package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);  // Added method to fix error
}
