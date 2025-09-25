package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.Question;
import com.adaptivelearning.adaptive_learning_backend.entity.Quiz;
import com.adaptivelearning.adaptive_learning_backend.repository.QuestionRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizController(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Optional<Quiz> quiz = quizRepository.findById(id);
        return quiz.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quizDetails) {
        return quizRepository.findById(id)
                .map(quiz -> {
                    quiz.setTitle(quizDetails.getTitle());
                    quiz.setDescription(quizDetails.getDescription());
                    quiz.setQuestions(quizDetails.getQuestions());
                    Quiz updatedQuiz = quizRepository.save(quiz);
                    return ResponseEntity.ok(updatedQuiz);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        Optional<Quiz> quizOpt = quizRepository.findById(id);
        if (quizOpt.isPresent()) {
            quizRepository.delete(quizOpt.get());
            return ResponseEntity.noContent().build(); // Correct: no body returned
        } else {
            return ResponseEntity.notFound().build();  // If not found, return 404
        }
    }

    @PostMapping("/{quizId}/questions")
    public ResponseEntity<Quiz> addQuestionToQuiz(@PathVariable Long quizId, @RequestBody Question question) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (!quizOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Quiz quiz = quizOptional.get();
        question = questionRepository.save(question);
        quiz.getQuestions().add(question);
        Quiz updatedQuiz = quizRepository.save(quiz);
        return ResponseEntity.ok(updatedQuiz);
    }
}
