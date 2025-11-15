package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.SystemLog;
import com.appdevf2.bluehire.service.SystemLogService;

import java.util.List;

@RestController
@RequestMapping("/system-logs")
@CrossOrigin(origins = "*") // Allows requests from any frontend (you can limit this if needed)
public class SystemLogController {

    @Autowired
    private SystemLogService systemLogService;

    // ✅ CREATE
    @PostMapping
    public SystemLog createSystemLog(@RequestBody SystemLog systemLog) {
        return systemLogService.createLog(systemLog);
    }

    // ✅ READ ALL
    @GetMapping
    public List<SystemLog> getAllSystemLogs() {
        return systemLogService.getAllLogs();
    }

    // ✅ READ BY ID
    @GetMapping("/{id}")
    public SystemLog getSystemLogById(@PathVariable Long id) {
        return systemLogService.getLogById(id)
                .orElseThrow(() -> new RuntimeException("System log not found with ID: " + id));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public SystemLog updateSystemLog(@PathVariable Long id, @RequestBody SystemLog updatedSystemLog) {
        return systemLogService.updateLog(id, updatedSystemLog);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String deleteSystemLog(@PathVariable Long id) {
        systemLogService.deleteLog(id);
        return "System log with ID " + id + " has been deleted successfully.";
    }
}
