package com.austine.StudentSystem_.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

// Administrator likely inherits from User in a full implementation
@Entity
@Table(name = "tbl_administrator")
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private int adminID;

    public Administrator() {}

    public int getAdminID() {
        return adminID;
    }
}
