package com.adaptivelearning.adaptive_learning_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalyticsController {

    @GetMapping("/analytics/daily-active-users")
    public ResponseEntity<String> getDailyActiveUsers() {
        // Placeholder for actual analytics logic
        int dailyActiveUsers = 123;  // Replace with real data fetch
        return ResponseEntity.ok("Daily Active Users: " + dailyActiveUsers);
    }

    @GetMapping("/analytics/average-quiz-score")
    public ResponseEntity<String> getAverageQuizScore() {
        // Placeholder logic for average quiz score
        double averageScore = 85.4;  // Replace with actual calculation
        return ResponseEntity.ok("Average Quiz Score: " + averageScore);
    }
}
