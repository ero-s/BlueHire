package com.appdevf2.bluehire.dto; // You may need to create a 'dto' package

public class ReportCreationDTO {

    private String description;
    private String proofFileURL;

    // Default constructor
    public ReportCreationDTO() {
        super();
    }

    // Getters and Setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProofFileURL() {
        return proofFileURL;
    }

    public void setProofFileURL(String proofFileURL) {
        this.proofFileURL = proofFileURL;
    }
}