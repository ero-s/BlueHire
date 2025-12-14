package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat; // Import this
import java.time.LocalDate;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewid")
    private Long reviewID;

    private int rating;
    
    private String feedback;
    
    @Column(name = "review_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // FIX: Allows String input
    private LocalDate reviewDate;

    @OneToOne(optional = false)
    @JoinColumn(name = "booking_id", unique = true, nullable = false)
    private Booking booking;

    public Review() {}

    public Review(int rating, String feedback, LocalDate reviewDate) {
        this.rating = rating;
        this.feedback = feedback;
        this.reviewDate = reviewDate;
    }

    // --- Getters and Setters ---
    public Long getReviewID() { return reviewID; }
    public void setReviewID(Long reviewID) { this.reviewID = reviewID; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public LocalDate getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }
}