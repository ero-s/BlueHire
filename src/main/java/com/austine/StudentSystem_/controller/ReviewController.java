package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.Review;
import com.austine.StudentSystem_.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
