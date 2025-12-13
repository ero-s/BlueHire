package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.appdevf2.bluehire.model.Report;

import jakarta.transaction.Transactional;

import com.appdevf2.bluehire.model.Booking;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    boolean existsByBooking(Booking booking);
    Report findByBooking(Booking booking);
    @Modifying
    @Query("DELETE FROM Report r WHERE r.booking.bookingID = :bookingID")
    @Transactional
    void deleteByBookingId(@Param("bookingID") Long bookingID);
}

