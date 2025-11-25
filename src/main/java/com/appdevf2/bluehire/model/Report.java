package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportID;

    private String description;
    private LocalDateTime submittedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String proofFileURL;

    @OneToOne
    @JoinColumn(name = "booking_id", unique = true, nullable = false)
    private Booking booking;

    public enum Status {
        OPEN,
        RESOLVED
    }

    public Report() {
        super();
    }

    public Report(String description, LocalDateTime submittedAt, Status status, String proofFileURL) {
        super();
        this.description = description;
        this.submittedAt = submittedAt;
        this.status = status;
        this.proofFileURL = proofFileURL;
    }

    public Long getReportID() {
        return reportID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getProofFileURL() {
        return proofFileURL;
    }

    public void setProofFileURL(String proofFileURL) {
        this.proofFileURL = proofFileURL;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
