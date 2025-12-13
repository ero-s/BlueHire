package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Review;

import jakarta.transaction.Transactional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByBooking(Booking booking);

    @Modifying
    @Query("DELETE FROM Review r WHERE r.booking.bookingID = :bookingID")
    @Transactional
    void deleteByBookingId(@Param("bookingID") Long bookingID);
}

