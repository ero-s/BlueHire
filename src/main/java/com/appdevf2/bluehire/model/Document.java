package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentID;

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

    public Document(String verifiedBy, String documentFileURL, Status status, LocalDateTime uploadedAt, DocumentType documentType, LocalDateTime reviewedAt) {
        super();
        this.verifiedBy = verifiedBy;
        this.documentFileURL = documentFileURL;
        this.status = status;
        this.uploadedAt = uploadedAt;
        this.documentType = documentType;
        this.reviewedAt = reviewedAt;
    }

    // Add Auto Timestamp Here
    @PrePersist
    public void onCreate() {
        this.uploadedAt = LocalDateTime.now();
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
}
