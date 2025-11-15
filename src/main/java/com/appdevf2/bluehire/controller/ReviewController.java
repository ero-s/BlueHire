package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Review;
import com.appdevf2.bluehire.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*") // Allow frontend access if needed
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // ✅ CREATE
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    // ✅ READ - ALL
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // ✅ READ - ONE
    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + id));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewService.updateReview(id, updatedReview);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return "Review with ID " + id + " has been deleted successfully.";
    }
}
