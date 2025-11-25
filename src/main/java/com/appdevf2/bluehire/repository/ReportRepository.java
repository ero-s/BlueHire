package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appdevf2.bluehire.model.Report;
import com.appdevf2.bluehire.model.Booking;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    boolean existsByBooking(Booking booking);
    Report findByBooking(Booking booking);
}

