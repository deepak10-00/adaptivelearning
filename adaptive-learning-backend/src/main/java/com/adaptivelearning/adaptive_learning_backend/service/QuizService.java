package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.Question;
import com.adaptivelearning.adaptive_learning_backend.entity.Quiz;
import com.adaptivelearning.adaptive_learning_backend.repository.QuestionRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Optional<Quiz> updateQuiz(Long id, Quiz quizDetails) {
        return quizRepository.findById(id).map(quiz -> {
            quiz.setTitle(quizDetails.getTitle());
            quiz.setDescription(quizDetails.getDescription());
            quiz.setQuestions(quizDetails.getQuestions());
            return quizRepository.save(quiz);
        });
    }

    public boolean deleteQuiz(Long id) {
        return quizRepository.findById(id).map(quiz -> {
            quizRepository.delete(quiz);
            return true;
        }).orElse(false);
    }

    public Optional<Quiz> addQuestionToQuiz(Long quizId, Question question) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isEmpty()) {
            return Optional.empty();
        }
        Question savedQuestion = questionRepository.save(question);
        Quiz quiz = quizOptional.get();
        quiz.getQuestions().add(savedQuestion);
        return Optional.of(quizRepository.save(quiz));
    }
}
