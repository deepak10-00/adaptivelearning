package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    public AnalyticsService(UserRepository userRepository, QuizRepository quizRepository) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
    }

    public long getDailyActiveUsers() {
        // Placeholder: Implement logic to count daily active users, e.g., users logged in within 24h
        return userRepository.count();  // Simplified example, replace with real logic
    }

    public double getAverageQuizScore() {
        // Placeholder: calculate average quiz score from quiz results
        // Implement actual aggregation or calculation as per your data model
        return 85.0;  // Example static value
    }
}
