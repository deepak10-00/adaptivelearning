package com.adaptivelearning.adaptive_learning_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hod {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "admin_level")
    private Integer adminLevel;

    @Column(name = "email")
    private String email;

    @Column(name = "code", unique = true)
    private String code; // Unique 3-digit code

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Version
    @Column(name = "version")
    private Long version;
}
