package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Report;
import com.appdevf2.bluehire.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // CREATE Report for a Booking
    @PostMapping("/booking/{bookingId}")
    public Report createReport(@PathVariable Long bookingId, @RequestBody Report report) {
        return reportService.createReport(bookingId, report);
    }

    // READ - ALL
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // READ - ONE
    @GetMapping("/{id}")
    public Report getReportById(@PathVariable Long id) {
        return reportService.getReportById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with ID: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Report updateReport(@PathVariable Long id, @RequestBody Report updatedReport) {
        return reportService.updateReport(id, updatedReport);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return "Report with ID " + id + " has been deleted successfully.";
    }
}
