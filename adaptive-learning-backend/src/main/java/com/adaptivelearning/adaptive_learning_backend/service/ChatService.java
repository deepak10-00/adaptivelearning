package com.adaptivelearning.adaptive_learning_backend.service;

import com.adaptivelearning.adaptive_learning_backend.entity.ChatMessage;
import com.adaptivelearning.adaptive_learning_backend.entity.User;
import com.adaptivelearning.adaptive_learning_backend.repository.ChatRepository;
import com.adaptivelearning.adaptive_learning_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public ChatMessage saveMessage(ChatMessage chatMessage) {
        // Optionally validate sender and recipient exist
        Optional<User> sender = userRepository.findById(chatMessage.getSender().getId());
        Optional<User> recipient = chatMessage.getRecipient() != null ?
                userRepository.findById(chatMessage.getRecipient().getId()) : Optional.empty();

        if (sender.isEmpty()) {
            throw new IllegalArgumentException("Sender user not found");
        }
        if (chatMessage.getRecipient() != null && recipient.isEmpty()) {
            throw new IllegalArgumentException("Recipient user not found");
        }

        return chatRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessagesForUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        return chatRepository.findBySenderOrRecipient(user.get(), user.get());
    }
}
