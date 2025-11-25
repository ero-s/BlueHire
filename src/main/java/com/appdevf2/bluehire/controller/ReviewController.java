package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Review;
import com.appdevf2.bluehire.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // CREATE - must include booking
    @PostMapping
    public Review createReview(@RequestBody Review review) {

        if (review.getBooking() == null || review.getBooking().getBookingID() == 0) {
            throw new RuntimeException("Review must be linked to an existing booking.");
        }

        Long bookingId = (long) review.getBooking().getBookingID();
        return reviewService.createReview(bookingId, review);
    }

    // READ all
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // READ one
    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + id));
    }

    // UPDATE (cannot change booking)
    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @RequestBody Review updatedReview) {

        return reviewService.updateReview(id, updatedReview);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return "Review with ID " + id + " deleted successfully.";
    }
}
