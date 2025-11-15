package com.appdevf2.bluehire.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import com.appdevf2.bluehire.model.embeddables.Address;
import com.appdevf2.bluehire.model.embeddables.Name;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("ADMIN")
public class Administrator extends User {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "admin_id")
    // private int adminID;

    public Administrator() {}

    public Administrator(Name name, String email, String contactNumber, Address address, String username, String password, String role) {
        super(name, email, contactNumber, address, username, password, role);
    }
    
    // public int getAdminID() {
    //     return adminID;
    // }
}
