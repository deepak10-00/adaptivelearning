package com.adaptivelearning.adaptive_learning_backend.repository;

import com.adaptivelearning.adaptive_learning_backend.entity.ChatMessage;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {

    // Find all messages where the user is sender or recipient
    List<ChatMessage> findBySenderOrRecipient(User sender, User recipient);
}
