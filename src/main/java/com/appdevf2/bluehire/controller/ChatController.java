package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Chat;
import com.appdevf2.bluehire.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat createdChat = chatService.createChat(chat);
        return ResponseEntity.ok(createdChat);
    }

    // ✅ READ ALL
    @GetMapping
    public ResponseEntity<List<Chat>> getAllChats() {
        List<Chat> chats = chatService.getAllChats();
        return ResponseEntity.ok(chats);
    }

    // ✅ READ BY ID
    @GetMapping("/{chatID}")
    public ResponseEntity<Chat> getChatById(@PathVariable Long chatID) {
        return chatService.getChatById(chatID)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ UPDATE
    @PutMapping("/{chatID}")
    public ResponseEntity<Chat> updateChat(
            @PathVariable Long chatID,
            @RequestBody Chat updatedChat
    ) {
        try {
            Chat chat = chatService.updateChat(chatID, updatedChat);
            return ResponseEntity.ok(chat);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ DELETE
    @DeleteMapping("/{chatID}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long chatID) {
        try {
            chatService.deleteChat(chatID);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
