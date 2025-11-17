package com.appdevf2.bluehire.model;

import jakarta.persistence.*;

import java.util.Date;

import com.appdevf2.bluehire.model.embeddables.Address;
import com.appdevf2.bluehire.model.embeddables.Name;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
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
    private Boolean isVerified;
    private Date createdAt;
    private String photoURL;

    public User() {
        super();
    }

    public User(Name name, String email, String contactNumber, Address address, String username, String password, String role) {
        super();
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.username = username;
        this.password = password;
        this.role = role;
        this.isVerified = false;
        this.createdAt = new Date();
        this.name = name;
        this.photoURL = null;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public int getUserId() {
        return userId;
    }

    public Name getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public Address getAddress() {
        return address;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getPhotoURL() {
        return photoURL;
    }
}
