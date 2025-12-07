package com.appdevf2.bluehire.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.appdevf2.bluehire.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("SELECT b FROM Booking b WHERE b.client.user.userId = :userId")
    List<Booking> findBookingsByClientUserId(@Param("userId") int userId);

    @Query("SELECT b FROM Booking b WHERE b.worker.user.userId = :userId")
    List<Booking> findBookingsByWorkerUserId(@Param("userId") int userId);
}
