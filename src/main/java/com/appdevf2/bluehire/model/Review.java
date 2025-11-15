package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewID;

    private int rating;
    private String feedback;
    private LocalDate reviewDate;

    public Review() {
        super();
    }

    public Review(int rating, String feedback, LocalDate reviewDate) {
        super();
        this.rating = rating;
        this.feedback = feedback;
        this.reviewDate = reviewDate;
    }

    public Long getReviewID() {
        return reviewID;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }
}
