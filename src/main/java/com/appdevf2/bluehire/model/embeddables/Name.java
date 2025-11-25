package com.appdevf2.bluehire.model.embeddables;

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
