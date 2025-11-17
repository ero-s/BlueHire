package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.util.Date;

import com.appdevf2.bluehire.model.embeddables.Address;
import com.appdevf2.bluehire.model.embeddables.Name;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Embedded
    private Name name;

    private String email;
    private String contactNumber;

    @Embedded
    private Address address;

    private String username;
    private String password;
    private String role;

    @JsonProperty("isVerified")
    @Column(name = "is_verified", nullable = false)
    private boolean isVerified = false;  // primitive type ensures NOT NULL

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date(); // default to current time

    private String photoURL;

    // ---------------- Constructors ----------------
    public User() {
        super();
    }

    public User(Name name, String email, String contactNumber, Address address, String username, String password, String role) {
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.username = username;
        this.password = password;
        this.role = role;
        this.isVerified = false;  // default false
        this.createdAt = new Date();
        this.photoURL = null;
    }

    // ---------------- Getters & Setters ----------------
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}
