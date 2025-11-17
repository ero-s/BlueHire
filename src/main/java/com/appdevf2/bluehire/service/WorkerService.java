package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.repository.WorkerRepository;
import com.appdevf2.bluehire.repository.UserRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private UserRepository userRepository;

    public WorkerService() {
        super();
    }

    // ✅ CREATE
    public Worker createWorker(Worker worker) {
        User user = worker.getUser();
        if (user != null) {
            userRepository.save(user);
        }
        return workerRepository.save(worker);
    }

    // ✅ READ ALL
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    // ✅ READ ONE
    public Worker getWorkerById(Integer workerId) {
        return workerRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("Worker not found with ID " + workerId));
    }

    // ✅ UPDATE
    public Worker updateWorker(Integer workerId, Worker updatedWorker) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NoSuchElementException("Worker not found with ID " + workerId));

        User updatedUser = updatedWorker.getUser();
        if (updatedUser != null) {
            User user = worker.getUser();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setAddress(updatedUser.getAddress());
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setIsVerified(updatedUser.getIsVerified());
            user.setPhotoURL(updatedUser.getPhotoURL());

            userRepository.save(user);
        }

        // Update Worker-specific fields
        worker.setSkills(updatedWorker.getSkills());
        worker.setHourlyRate(updatedWorker.getHourlyRate());
        worker.setDailyRate(updatedWorker.getDailyRate());
        worker.setCompletedJobCount(updatedWorker.getCompletedJobCount());
        worker.setAvailabilityStatus(updatedWorker.isAvailabilityStatus());
        worker.setAverageRating(updatedWorker.getAverageRating());
        worker.setTotalEarnings(updatedWorker.getTotalEarnings());

        return workerRepository.save(worker);
    }

    // ✅ DELETE
    public String deleteWorker(Integer workerId) {
        if (workerRepository.findById(workerId).isPresent()) {
            workerRepository.deleteById(workerId);
            return "Worker with ID " + workerId + " deleted successfully.";
        } else {
            return "Worker with ID " + workerId + " not found.";
        }
    }
}
