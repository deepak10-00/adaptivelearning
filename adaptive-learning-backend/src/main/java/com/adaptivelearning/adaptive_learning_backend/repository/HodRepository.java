package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.Hod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HodRepository extends JpaRepository<Hod, Long> {
    Optional<Hod> findByUserId(Long userId);

    boolean existsByCode(String code);
}
