package com.appdevf2.bluehire.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingID;

    @Column(name = "job_title", nullable = true)
    private String jobTitle;

    @Column(name = "service_category", nullable = true)
    private String serviceCategory;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "location", nullable = true)
    private String location;

    @Column(name = "scheduled_date_time", nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime scheduledDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = true)
    private Status status;

    @Column(name = "created_at", nullable = true)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "client", nullable = true)
    @JsonIgnoreProperties({"bookings"})
    private Client client;

    @ManyToOne
    @JoinColumn(name = "worker", nullable = true)
    @JsonIgnoreProperties({"skills", "coverage_areas"})
    private Worker worker;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("booking")
    private Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("booking")
    private Review review;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("booking")
    private Report report;

    // --- UPDATED ENUM WITH "Responded" ---
    public enum Status {
        Pending,        // 1. Worker Applied -> Waiting for Client
        Responded,      // 2. NEW: Client Clicked "Accept" -> Waiting for Worker to Confirm
        Client_Agreed,  // (You can keep or remove this if "Responded" replaces it)
        Accepted,       // 3. Worker Confirmed -> Ongoing Job
        Completed,      // 4. Job Done
        Declined,       // 5. Client Rejected Application
        Cancelled       // 6. Worker Withdrew Application
    }

    public Booking() {}

    // --- Getters and Setters ---
    // (unchanged)
    
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