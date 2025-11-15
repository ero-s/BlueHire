package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Chat;
import com.appdevf2.bluehire.repository.ChatRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    // ✅ CREATE
    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }

    // ✅ READ ALL
    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    // ✅ READ BY ID
    public Optional<Chat> getChatById(Long chatID) {
        return chatRepository.findById(chatID);
    }

    // ✅ UPDATE
    public Chat updateChat(Long chatID, Chat updatedChat) {
        return chatRepository.findById(chatID).map(chat -> {
            chat.setMessageContent(updatedChat.getMessageContent());
            chat.setSentAt(updatedChat.getSentAt());
            chat.setReadAt(updatedChat.getReadAt());
            return chatRepository.save(chat);
        }).orElseThrow(() -> new RuntimeException("Chat not found with ID: " + chatID));
    }

    // ✅ DELETE
    public void deleteChat(Long chatID) {
        if (!chatRepository.existsById(chatID)) {
            throw new RuntimeException("Chat not found with ID: " + chatID);
        }
        chatRepository.deleteById(chatID);
    }
}
