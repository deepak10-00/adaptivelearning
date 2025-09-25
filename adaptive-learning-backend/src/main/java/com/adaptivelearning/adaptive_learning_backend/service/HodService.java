package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.Hod;
import com.adaptivelearning.adaptive_learning_backend.repository.HodRepository;
import org.hibernate.StaleObjectStateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
public class HodService {

    private final HodRepository hodRepository;
    private final Random random = new Random();

    public HodService(HodRepository hodRepository) {
        this.hodRepository = hodRepository;
    }

    private String generateUnique3DigitCode() {
        String code;
        for (int i = 0; i < 10; i++) {
            code = String.valueOf(100 + random.nextInt(900)); // Generates from 100 to 999
            if (!hodRepository.existsByCode(code)) {
                return code;
            }
        }
        throw new RuntimeException("Unable to generate unique 3-digit code for HOD");
    }

    @Transactional
    public Hod saveHod(Hod hod) {
        if (hod.getCode() == null || hod.getCode().isEmpty()) {
            hod.setCode(generateUnique3DigitCode());
        }

        int maxRetries = 3;
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                Optional<Hod> existingHodOpt = hodRepository.findByUserId(hod.getUserId());
                if (existingHodOpt.isPresent()) {
                    Hod existingHod = existingHodOpt.get();
                    existingHod.setDepartmentName(hod.getDepartmentName());
                    existingHod.setAdminLevel(hod.getAdminLevel());
                    existingHod.setEmail(hod.getEmail());
                    existingHod.setCode(hod.getCode());
                    return hodRepository.save(existingHod);
                } else {
                    return hodRepository.save(hod);
                }
            } catch (StaleObjectStateException e) {
                if (attempt == maxRetries) {
                    throw new RuntimeException("Concurrent update failed after multiple attempts", e);
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        throw new RuntimeException("Failed to save Hod entity due to concurrent updates");
    }

    @Transactional
    public void assignCodesToExistingHods() {
        Set<String> usedCodes = new HashSet<>();
        hodRepository.findAll().forEach(hod -> {
            if (hod.getCode() != null) {
                usedCodes.add(hod.getCode());
            }
        });

        hodRepository.findAll().stream()
                .filter(hod -> hod.getCode() == null)
                .forEach(hod -> {
                    String code;
                    do {
                        code = String.valueOf(100 + random.nextInt(900));
                    } while (usedCodes.contains(code));
                    hod.setCode(code);
                    usedCodes.add(code);
                    hodRepository.save(hod);
                });
    }

    public Optional<Hod> findByUserId(Long userId) {
        return hodRepository.findByUserId(userId);
    }
}
