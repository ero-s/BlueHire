package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.appdevf2.bluehire.model.Payment;

import jakarta.transaction.Transactional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Modifying
    @Query("DELETE FROM Payment p WHERE p.booking.bookingID = :bookingID")
    @Transactional
    void deleteByBookingId(@Param("bookingID") int bookingID);
}
