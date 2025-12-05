package com.appdevf2.bluehire.model.embeddables;

import jakarta.persistence.Embeddable;

@Embeddable
public class Name {
    private String fname;
    private String middlename;
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

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }
}
