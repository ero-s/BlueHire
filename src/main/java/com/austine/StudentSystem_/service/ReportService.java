package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Report;
import com.austine.StudentSystem_.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // CREATE
    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    // READ - all
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // READ - one
    public Optional<Report> getReportById(Long reportID) {
        return reportRepository.findById(reportID);
    }

    // UPDATE
    public Report updateReport(Long reportID, Report updatedReport) {
        return reportRepository.findById(reportID).map(report -> {
            report.setDescription(updatedReport.getDescription());
            report.setSubmittedAt(updatedReport.getSubmittedAt());
            report.setStatus(updatedReport.getStatus());
            report.setProofFileURL(updatedReport.getProofFileURL());
            return reportRepository.save(report);
        }).orElseThrow(() -> new RuntimeException("Report not found with ID: " + reportID));
    }

    // DELETE
    public void deleteReport(Long reportID) {
        if (!reportRepository.existsById(reportID)) {
            throw new RuntimeException("Report not found with ID: " + reportID);
        }
        reportRepository.deleteById(reportID);
    }
}
