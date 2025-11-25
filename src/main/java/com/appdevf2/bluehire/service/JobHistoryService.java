package com.appdevf2.bluehire.service;

import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.JobHistory;
import com.appdevf2.bluehire.repository.JobHistoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class JobHistoryService {

    private final JobHistoryRepository jobHistoryRepository;

    public JobHistoryService(JobHistoryRepository jobHistoryRepository) {
        this.jobHistoryRepository = jobHistoryRepository;
    }

    // CREATE
    public JobHistory createJobHistory(JobHistory jobHistory) {
        return jobHistoryRepository.save(jobHistory);
    }

    // READ - all
    public List<JobHistory> getAllJobHistories() {
        return jobHistoryRepository.findAll();
    }

    // READ - one
    public Optional<JobHistory> getJobHistoryById(Long jobID) {
        return jobHistoryRepository.findById(jobID);
    }

    // UPDATE
    public JobHistory updateJobHistory(Long jobID, JobHistory updatedJobHistory) {
        return jobHistoryRepository.findById(jobID).map(jobHistory -> {
            jobHistory.setCompletionDate(updatedJobHistory.getCompletionDate());
            jobHistory.setEarnings(updatedJobHistory.getEarnings());
            return jobHistoryRepository.save(jobHistory);
        }).orElseThrow(() -> new RuntimeException("Job history not found with ID: " + jobID));
    }

    // DELETE
    public void deleteJobHistory(Long jobID) {
        if (!jobHistoryRepository.existsById(jobID)) {
            throw new RuntimeException("Job history not found with ID: " + jobID);
        }
        jobHistoryRepository.deleteById(jobID);
    }
}
