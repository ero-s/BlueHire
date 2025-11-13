package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.JobHistory;
import com.austine.StudentSystem_.service.JobHistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job-histories")
@CrossOrigin(origins = "*") // Allow requests from any frontend (adjust as needed)
public class JobHistoryController {

    @Autowired
    private JobHistoryService jobHistoryService;

    // ✅ CREATE
    @PostMapping
    public JobHistory createJobHistory(@RequestBody JobHistory jobHistory) {
        return jobHistoryService.createJobHistory(jobHistory);
    }

    // ✅ READ - ALL
    @GetMapping
    public List<JobHistory> getAllJobHistories() {
        return jobHistoryService.getAllJobHistories();
    }

    // ✅ READ - ONE
    @GetMapping("/{id}")
    public JobHistory getJobHistoryById(@PathVariable Long id) {
        return jobHistoryService.getJobHistoryById(id)
                .orElseThrow(() -> new RuntimeException("Job history not found with ID: " + id));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public JobHistory updateJobHistory(@PathVariable Long id, @RequestBody JobHistory updatedJobHistory) {
        return jobHistoryService.updateJobHistory(id, updatedJobHistory);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String deleteJobHistory(@PathVariable Long id) {
        jobHistoryService.deleteJobHistory(id);
        return "Job history with ID " + id + " has been deleted successfully.";
    }
}
