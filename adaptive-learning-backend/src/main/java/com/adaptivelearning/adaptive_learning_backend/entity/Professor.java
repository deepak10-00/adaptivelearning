package com.adaptivelearning.adaptive_learning_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "professors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professor {
    @Id
    @Column(name = "user_id")
    private Long userId;

    private String name;
    private String mobile;
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "joining_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDate joiningDate;

    @OneToOne
    @MapsId  // Maps this entity's PK to User's PK
    @JoinColumn(name = "user_id")
    private User user;
}
