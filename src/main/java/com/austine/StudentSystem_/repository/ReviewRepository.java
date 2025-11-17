package com.austine.StudentSystem_.repository;

import com.austine.StudentSystem_.model.Booking;
import com.austine.StudentSystem_.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByBooking(Booking booking);
}

