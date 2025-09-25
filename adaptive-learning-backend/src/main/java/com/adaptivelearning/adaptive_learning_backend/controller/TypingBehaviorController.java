package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.TypingBehaviorLog;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.repository.TypingBehaviorRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/typing")
public class TypingBehaviorController {

    private final TypingBehaviorRepository typingBehaviorLogRepository;
    private final UserRepository userRepository;

    public TypingBehaviorController(TypingBehaviorRepository typingBehaviorLogRepository,
                                    UserRepository userRepository) {
        this.typingBehaviorLogRepository = typingBehaviorLogRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/log")
    public ResponseEntity<TypingBehaviorLog> logTypingBehavior(@RequestBody TypingBehaviorLog typingBehaviorLog,
                                                               Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        typingBehaviorLog.setUser(user);
        typingBehaviorLog.setTimestamp(LocalDateTime.now());
        TypingBehaviorLog savedLog = typingBehaviorLogRepository.save(typingBehaviorLog);
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping("/logs")
    public ResponseEntity<List<TypingBehaviorLog>> getUserTypingLogs(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        List<TypingBehaviorLog> logs = typingBehaviorLogRepository.findByUser(user);
        return ResponseEntity.ok(logs);
    }
}
