package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Foreign Key
    @JsonIgnore 

    private User user;

    private String verifiedBy;

    private String documentFileURL;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime uploadedAt;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    private LocalDateTime reviewedAt;

    public Document() {
        super();
    }

    public Document(User user, String documentFileURL, DocumentType documentType) {
        this.user = user;
        this.documentFileURL = documentFileURL;
        this.documentType = documentType;
        this.status = Status.PENDING; // Default status
        this.uploadedAt = LocalDateTime.now();
    }

    // Add Auto Timestamp Here
    @PrePersist
    public void onCreate() {
        this.uploadedAt = LocalDateTime.now();
        if(this.status == null) this.status = Status.PENDING;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getDocumentID() {
        return documentID;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getDocumentFileURL() {
        return documentFileURL;
    }

    public void setDocumentFileURL(String documentFileURL) {
        this.documentFileURL = documentFileURL;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public enum Status {
        PENDING,
        VERIFIED,
        REJECTED
    }

    public enum DocumentType {
        GOV_ID,
        PASSPORT,
        DRIVER_LICENSE,
        OTHER
    }

    @JsonProperty("workerName")
    public String getWorkerName() {
        if (user != null && user.getName() != null) {
            return user.getName().getFirstName() + " " + user.getName().getLastName();
        }
        return "Unknown";
    }
}
