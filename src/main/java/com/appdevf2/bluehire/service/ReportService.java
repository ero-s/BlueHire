package com.appdevf2.bluehire.service;

import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.ReportRepository;
import com.appdevf2.bluehire.model.Report;
import com.appdevf2.bluehire.model.Booking;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final BookingRepository bookingRepository;

    public ReportService(ReportRepository reportRepository,
                         BookingRepository bookingRepository) {
        this.reportRepository = reportRepository;
        this.bookingRepository = bookingRepository;
    }

    // ============================
    // CREATE REPORT FOR A BOOKING
    // ============================
    public Report createReport(Long bookingId, Report report) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        // Prevent more than 1 report per booking
        if (reportRepository.existsByBooking(booking)) {
            throw new RuntimeException("This booking already has a report.");
        }

        // Link booking
        report.setBooking(booking);

        // ✅ FOLLOW DATABASE ENUM EXACTLY
        report.setSubmittedAt(LocalDateTime.now());
        report.setStatus(Report.Status.OPEN);

        return reportRepository.save(report);
    }

    // ============================
    // READ ALL REPORTS
    // ============================
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // ============================
    // READ ONE REPORT
    // ============================
    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    // ============================
    // UPDATE REPORT (booking immutable)
    // ============================
    public Report updateReport(Long id, Report updatedReport) {

        return reportRepository.findById(id).map(existing -> {

            existing.setDescription(updatedReport.getDescription());
            existing.setProofFileURL(updatedReport.getProofFileURL());

            // Allow status change (OPEN → RESOLVED)
            if (updatedReport.getStatus() != null) {
                existing.setStatus(updatedReport.getStatus());
            }

            // ❌ submittedAt is intentionally NOT modified

            return reportRepository.save(existing);

        }).orElseThrow(() ->
                new RuntimeException("Report not found with ID: " + id));
    }

    // ============================
    // DELETE REPORT
    // ============================
    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("Report not found with ID: " + id);
        }
        reportRepository.deleteById(id);
    }
}
