package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByBooking(Booking booking);
}

