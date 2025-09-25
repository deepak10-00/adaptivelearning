package com.adaptivelearning.adaptive_learning_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "typing_behavior_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypingBehaviorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who typed
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The typed text
    @Column(nullable = false, length = 5000)
    private String typedText;

    // Typing speed (e.g., characters per minute)
    private Double typingSpeed;

    // Timestamp of the log
    @Column(nullable = false)
    private LocalDateTime timestamp;
}
