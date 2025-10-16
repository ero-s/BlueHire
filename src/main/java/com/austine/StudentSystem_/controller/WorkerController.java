package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.User;
import com.austine.StudentSystem_.model.Worker;
import com.austine.StudentSystem_.repository.WorkerRepository;
import com.austine.StudentSystem_.service.UserService;
import com.austine.StudentSystem_.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @GetMapping("/postWorkerRecord")
    public User postUser(@RequestBody Worker worker) {
        return workerService.postWorkerRecord(worker);
    }

    @GetMapping("/getAllWorkers")
    public List<Worker> getAllWorkers() {
        return workerService.getAllWorkerRecord();
    }
}

