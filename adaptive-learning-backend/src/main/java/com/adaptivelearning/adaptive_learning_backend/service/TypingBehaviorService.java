package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.TypingBehaviorLog;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.repository.TypingBehaviorRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypingBehaviorService {

    private final TypingBehaviorRepository typingBehaviorLogRepository;
    private final UserRepository userRepository;

    public TypingBehaviorService(TypingBehaviorRepository typingBehaviorLogRepository,
                                 UserRepository userRepository) {
        this.typingBehaviorLogRepository = typingBehaviorLogRepository;
        this.userRepository = userRepository;
    }

    public TypingBehaviorLog logTypingBehavior(TypingBehaviorLog typingBehaviorLog, String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        typingBehaviorLog.setUser(userOpt.get());
        return typingBehaviorLogRepository.save(typingBehaviorLog);
    }

    public List<TypingBehaviorLog> getTypingLogsForUser(String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        return typingBehaviorLogRepository.findByUser(userOpt.get());
    }
}
