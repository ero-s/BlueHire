package com.appdevf2.bluehire.model.embeddables;

import jakarta.persistence.Embeddable;

@Embeddable
public class Name {
    
    // 1. Rename the fields
    private String firstName;
    private String middleName;
    private String lastName;

    public Name() {}

    public Name(String firstName, String middleName, String lastName) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    // 2. IMPORTANT: Generate NEW Getters and Setters matching the new names
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
}