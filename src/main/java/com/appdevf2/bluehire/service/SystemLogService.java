package com.appdevf2.bluehire.service;

import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.SystemLog;
import com.appdevf2.bluehire.repository.SystemLogRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SystemLogService {

    private final SystemLogRepository systemLogRepository;

    public SystemLogService(SystemLogRepository systemLogRepository) {
        this.systemLogRepository = systemLogRepository;
    }

    // CREATE
    public SystemLog createLog(SystemLog log) {
        return systemLogRepository.save(log);
    }

    // READ - all
    public List<SystemLog> getAllLogs() {
        return systemLogRepository.findAll();
    }

    // READ - one
    public Optional<SystemLog> getLogById(Long logID) {
        return systemLogRepository.findById(logID);
    }

    // UPDATE
    public SystemLog updateLog(Long logID, SystemLog updatedLog) {
        return systemLogRepository.findById(logID).map(log -> {
            log.setAction(updatedLog.getAction());
            log.setTimestamp(updatedLog.getTimestamp());
            return systemLogRepository.save(log);
        }).orElseThrow(() -> new RuntimeException("System log not found with ID: " + logID));
    }

    // DELETE
    public void deleteLog(Long logID) {
        if (!systemLogRepository.existsById(logID)) {
            throw new RuntimeException("System log not found with ID: " + logID);
        }
        systemLogRepository.deleteById(logID);
    }
}
