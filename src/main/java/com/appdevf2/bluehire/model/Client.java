package com.appdevf2.bluehire.model;

import jakarta.persistence.*;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientID;

    // Reference to the User table
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Client() {}

    public Client(User user) {
        this.user = user;
    }

    // Getters and setters
    public int getClientID() {
        return clientID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
