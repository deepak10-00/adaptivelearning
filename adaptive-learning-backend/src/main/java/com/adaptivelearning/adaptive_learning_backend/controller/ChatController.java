package com.adaptivelearning.adaptive_learning_backend.controller;

import com.adaptivelearning.adaptive_learning_backend.entity.ChatMessage;
import com.adaptivelearning.adaptive_learning_backend.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage chatMessage) {
        ChatMessage savedMessage = chatService.saveMessage(chatMessage);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/messages/{userId}")
    public ResponseEntity<List<ChatMessage>> getMessagesForUser(@PathVariable Long userId) {
        List<ChatMessage> messages = chatService.getMessagesForUser(userId);
        return ResponseEntity.ok(messages);
    }
}
