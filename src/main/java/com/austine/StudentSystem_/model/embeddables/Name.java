package com.austine.StudentSystem_.model.embeddables;

import jakarta.persistence.Embeddable;

@Embeddable
public class Name {
    private String fname;
    private String lname;

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }
}
