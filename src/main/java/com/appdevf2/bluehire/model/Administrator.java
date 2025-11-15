package com.appdevf2.bluehire.model;

import jakarta.persistence.*;

@Entity
@Table(name = "administrator")
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int adminID;

    // Reference to the User table
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Administrator() {}

    public Administrator(User user) {
        this.user = user;
    }

    public int getAdminID() {
        return adminID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
