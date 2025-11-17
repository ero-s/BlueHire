package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Booking;
import com.austine.StudentSystem_.model.Review;
import com.austine.StudentSystem_.repository.BookingRepository;
import com.austine.StudentSystem_.repository.ReviewRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         BookingRepository bookingRepository) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
    }

    // CREATE review for a booking
    public Review createReview(Long bookingId, Review review) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking does not exist: " + bookingId));

        // Prevent duplicate review for same booking
        if (reviewRepository.existsByBooking(booking)) {
            throw new RuntimeException("This booking already has a review.");
        }

        review.setBooking(booking);
        return reviewRepository.save(review);
    }

    // READ all
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // READ one
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    // UPDATE (booking cannot be changed)
    public Review updateReview(Long id, Review updatedReview) {
        return reviewRepository.findById(id).map(existing -> {

            existing.setRating(updatedReview.getRating());
            existing.setFeedback(updatedReview.getFeedback());
            existing.setReviewDate(updatedReview.getReviewDate());

            return reviewRepository.save(existing);

        }).orElseThrow(() ->
                new RuntimeException("Review not found with ID: " + id));
    }

    // DELETE
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found with ID: " + id);
        }
        reviewRepository.deleteById(id);
    }
}
