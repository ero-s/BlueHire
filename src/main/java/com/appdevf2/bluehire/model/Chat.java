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

    private LocalDateTime readAt;

    // @ManyToOne
    // @JoinColumn(name = "sender_id")
    // private User sender;

    // @ManyToOne
    // @JoinColumn(name = "receiver_id")
    // private User receiver;

    public Chat() {
        super();
    }

    public Chat(String messageContent, LocalDateTime sentAt, LocalDateTime readAt) {
        super();
        this.messageContent = messageContent;
        this.sentAt = sentAt;
        this.readAt = readAt;
    }

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

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}
