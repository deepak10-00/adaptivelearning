package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.InterviewRecord;
import com.adaptivelearning.adaptive_learning_backend.repository.InterviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

    private final InterviewRepository interviewRepository;

    public InterviewController(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    @GetMapping
    public ResponseEntity<List<InterviewRecord>> getAllInterviews() {
        List<InterviewRecord> interviews = interviewRepository.findAll();
        return ResponseEntity.ok(interviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewRecord> getInterviewById(@PathVariable Long id) {
        return interviewRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<InterviewRecord> createInterview(@RequestBody InterviewRecord interviewRecord) {
        InterviewRecord savedRecord = interviewRepository.save(interviewRecord);
        return ResponseEntity.ok(savedRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewRecord> updateInterview(@PathVariable Long id, @RequestBody InterviewRecord interviewDetails) {
        return interviewRepository.findById(id)
                .map(interview -> {
                    interview.setInterviewDate(interviewDetails.getInterviewDate());
                    interview.setFeedback(interviewDetails.getFeedback());
                    interview.setStatus(interviewDetails.getStatus());
                    // Update other fields as needed
                    InterviewRecord updatedRecord = interviewRepository.save(interview);
                    return ResponseEntity.ok(updatedRecord);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        // deletion logic
        return ResponseEntity.noContent().build();  // Correct usage for ResponseEntity<Void>
    }

}

