package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingID;

    @Column(name = "job_title")
    private String jobTitle;

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

    // --- CORRECTION HERE ---
    @ManyToOne
    @JoinColumn(name = "client", nullable = false)
    // ONLY ignore 'bookings'. Allow 'user' so we can see the name!
    @JsonIgnoreProperties({"bookings"}) 
    private Client client;

    // --- Correct: Worker is nullable for new posts ---
    @ManyToOne
    @JoinColumn(name = "worker", nullable = true)
    @JsonIgnoreProperties({"user", "skills", "coverage_areas"})
    private Worker worker;

    // --- Correct: Links to Payment for the Budget ---
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("booking") 
    private Payment payment;

    public enum Status {
        Pending, Accepted, Completed, Cancelled
    }

    public Booking() {}

    // --- Getters and Setters ---
    
    public Long getBookingID() { return bookingID; }
    public void setBookingID(Long bookingID) { this.bookingID = bookingID; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDateTime getScheduledDateTime() { return scheduledDateTime; }
    public void setScheduledDateTime(LocalDateTime scheduledDateTime) { this.scheduledDateTime = scheduledDateTime; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public Worker getWorker() { return worker; }
    public void setWorker(Worker worker) { this.worker = worker; }

    public Payment getPayment() { return payment; }
    public void setPayment(Payment payment) { this.payment = payment; }
}