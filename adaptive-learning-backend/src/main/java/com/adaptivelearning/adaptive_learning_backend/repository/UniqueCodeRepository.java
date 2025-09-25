package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.UniqueCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UniqueCodeRepository extends JpaRepository<UniqueCode, Long> {

    Optional<UniqueCode> findByCode(String code);
}
