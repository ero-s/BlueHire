package com.austine.StudentSystem_.repository;

import com.austine.StudentSystem_.model.Booking;
import com.austine.StudentSystem_.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    boolean existsByBooking(Booking booking);
    Report findByBooking(Booking booking);
}

