package com.austine.StudentSystem_.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingID;

    @Column(name = "service_category")
    private String serviceCategory;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "scheduled_date_time")
    private LocalDateTime scheduledDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Booking likely has relationships in a full implementation

    public enum Status {
        Pending,
        Accepted,
        Completed,
        Cancelled
    }

    public Booking() {}

    public Booking(String serviceCategory, String description, String location,
                   LocalDateTime scheduledDateTime, Status status, LocalDateTime createdAt) {
        this.serviceCategory = serviceCategory;
        this.description = description;
        this.location = location;
        this.scheduledDateTime = scheduledDateTime;
        this.status = status;
        this.createdAt = createdAt;
    }

    public int getBookingID() {
        return bookingID;
    }

    public void setBookingID(int bookingID) {
        this.bookingID = bookingID;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getScheduledDateTime() {
        return scheduledDateTime;
    }

    public void setScheduledDateTime(LocalDateTime scheduledDateTime) {
        this.scheduledDateTime = scheduledDateTime;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
