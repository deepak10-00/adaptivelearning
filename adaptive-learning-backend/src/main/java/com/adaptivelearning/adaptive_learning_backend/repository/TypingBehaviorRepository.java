package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.TypingBehaviorLog;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TypingBehaviorRepository extends JpaRepository<TypingBehaviorLog, Long> {

    // Find all typing logs for a specific user
    List<TypingBehaviorLog> findByUser(User user);
}
