package com.adaptivelearning.adaptive_learning_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The student who gave the interview
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    // The professor or interviewer user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id")
    private User interviewer;

    // Date and time of interview
    @Column(nullable = false)
    private LocalDateTime interviewDate;

    // Interview feedback or notes
    @Column(length = 2000)
    private String feedback;

    // Interview status (e.g., Passed, Failed, Pending)
    @Column(nullable = false)
    private String status;
}
