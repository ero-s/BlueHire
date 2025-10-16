package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Worker;
import com.austine.StudentSystem_.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    public WorkerService() {
        super();
    }

    public Worker postWorkerRecord(Worker worker) {
        return workerRepository.save(worker);
    }

    public List<Worker> getAllWorkerRecord() {
        return workerRepository.findAll();
    }
}
