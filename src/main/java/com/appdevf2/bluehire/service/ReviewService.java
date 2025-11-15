package com.appdevf2.bluehire.service;

import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Review;
import com.appdevf2.bluehire.repository.ReviewRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // CREATE
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    // READ - all
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // READ - one
    public Optional<Review> getReviewById(Long reviewID) {
        return reviewRepository.findById(reviewID);
    }

    // UPDATE
    public Review updateReview(Long reviewID, Review updatedReview) {
        return reviewRepository.findById(reviewID).map(review -> {
            review.setRating(updatedReview.getRating());
            review.setFeedback(updatedReview.getFeedback());
            review.setReviewDate(updatedReview.getReviewDate());
            return reviewRepository.save(review);
        }).orElseThrow(() -> new RuntimeException("Review not found with ID: " + reviewID));
    }

    // DELETE
    public void deleteReview(Long reviewID) {
        if (!reviewRepository.existsById(reviewID)) {
            throw new RuntimeException("Review not found with ID: " + reviewID);
        }
        reviewRepository.deleteById(reviewID);
    }
}
