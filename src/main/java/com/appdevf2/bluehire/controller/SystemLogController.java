package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.SystemLog;
import com.appdevf2.bluehire.service.SystemLogService;

import java.util.List;

@RestController
@RequestMapping("/system-logs")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if needed
public class SystemLogController {

    @Autowired
    private SystemLogService systemLogService;

    // =========================
    // CREATE
    // =========================
    @PostMapping
    public SystemLog createSystemLog(@RequestBody SystemLog systemLog) {
        // Do not log creation of system logs themselves
        return systemLogService.createLog(systemLog);
    }

    // =========================
    // READ ALL
    // =========================
    @GetMapping
    public List<SystemLog> getAllSystemLogs() {
        // Just return logs, avoid logging to prevent recursion
        return systemLogService.getAllLogs();
    }

    // =========================
    // READ BY ID
    // =========================
    @GetMapping("/{id}")
    public SystemLog getSystemLogById(@PathVariable Long id) {
        // Avoid logging here as well
        return systemLogService.getLogById(id)
                .orElseThrow(() -> new RuntimeException("System log not found with ID: " + id));
    }

    // =========================
    // UPDATE
    // =========================
    @PutMapping("/{id}")
    public SystemLog updateSystemLog(@PathVariable Long id, @RequestBody SystemLog updatedSystemLog) {
        // Avoid logging system log updates to prevent infinite loop
        return systemLogService.updateLog(id, updatedSystemLog);
    }

    // =========================
    // DELETE
    // =========================
    @DeleteMapping("/{id}")
    public String deleteSystemLog(@PathVariable Long id) {
        // Avoid logging deletion of system logs
        systemLogService.deleteLog(id);
        return "System log with ID " + id + " has been deleted successfully.";
    }

    // =========================
    // EXAMPLE: LOG USER ACTION
    // =========================
    // Use this endpoint to log normal user actions safely
    @PostMapping("/log-action")
    public String logUserAction(@RequestParam String action) {
        systemLogService.logEvent(action);
        return "Action logged successfully.";
    }
}
