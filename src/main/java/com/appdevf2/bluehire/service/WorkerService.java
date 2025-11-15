package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.repository.WorkerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    public WorkerService() {
        super();
    }

    // CREATE
    public Worker postWorkerRecord(Worker worker) {
        return workerRepository.save(worker);
    }

    // READ ALL
    public List<Worker> getAllWorkerRecord() {
        return workerRepository.findAll();
    }

    // READ ONE
    public Optional<Worker> getWorkerById(Integer workerId) {
        return workerRepository.findById(workerId);
    }

    // UPDATE
    public Worker updateWorker(Integer workerId, Worker updatedWorker) {
        return workerRepository.findById(workerId)
                .map(worker -> {
                    worker.setName(updatedWorker.getName());
                    worker.setRole(updatedWorker.getRole());
                    worker.setEmail(updatedWorker.getEmail());
                    worker.setAddress(updatedWorker.getAddress());
                    worker.setVerified(updatedWorker.getVerified());
                    worker.setSkills(updatedWorker.getSkills());
                    worker.setAvailabilityStatus(updatedWorker.isAvailabilityStatus());
                    worker.setDailyRate(updatedWorker.getDailyRate());
                    worker.setTotalEarnings(updatedWorker.getTotalEarnings());
                    // add other fields as needed
                    return workerRepository.save(worker);
                })
                .orElseThrow(() -> new RuntimeException("Worker not found with ID " + workerId));
    }

    // DELETE
    public void deleteWorker(Integer workerId) {
        workerRepository.deleteById(workerId);
    }
}
