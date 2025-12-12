package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatID;

    private String messageContent;

    private LocalDateTime sentAt;

    // ✅ Added this back
    private LocalDateTime readAt;

    private Integer senderId;
    private Integer receiverId;

    public Chat() {
        super();
    }

    public Chat(String messageContent, Integer senderId, Integer receiverId) {
        this.messageContent = messageContent;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.sentAt = LocalDateTime.now();
    }

    // --- Getters and Setters ---

    public Long getChatID() {
        return chatID;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    // ✅ Added Getters/Setters for readAt
    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }
}