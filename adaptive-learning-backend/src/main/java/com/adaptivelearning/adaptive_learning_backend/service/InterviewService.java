package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.InterviewRecord;
import com.adaptivelearning.adaptive_learning_backend.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    private final InterviewRepository interviewRecordRepository;

    public InterviewService(InterviewRepository interviewRecordRepository) {
        this.interviewRecordRepository = interviewRecordRepository;
    }

    public List<InterviewRecord> getAllInterviews() {
        return interviewRecordRepository.findAll();
    }

    public Optional<InterviewRecord> getInterviewById(Long id) {
        return interviewRecordRepository.findById(id);
    }

    public InterviewRecord createInterview(InterviewRecord interviewRecord) {
        return interviewRecordRepository.save(interviewRecord);
    }

    public Optional<InterviewRecord> updateInterview(Long id, InterviewRecord interviewDetails) {
        return interviewRecordRepository.findById(id).map(interview -> {
            interview.setInterviewDate(interviewDetails.getInterviewDate());
            interview.setFeedback(interviewDetails.getFeedback());
            interview.setStatus(interviewDetails.getStatus());
            // Update other fields as needed
            return interviewRecordRepository.save(interview);
        });
    }

    public boolean deleteInterview(Long id) {
        return interviewRecordRepository.findById(id).map(interview -> {
            interviewRecordRepository.delete(interview);
            return true;
        }).orElse(false);
    }
}
