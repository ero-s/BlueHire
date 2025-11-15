package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.service.WorkerService;

import java.util.List;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @PostMapping("/postWorker")
    public Worker postWorker(@RequestBody Worker worker) {
        return workerService.createWorker(worker);
    }

    @GetMapping("/getAllWorkers")
    public List<Worker> getAllWorkers() {
        return workerService.getAllWorkers();
    }

   @GetMapping("/getWorker/{id}")
    public Worker getWorkerById(@PathVariable Integer id) {
        return workerService.getWorkerById(id);
    }


    @PutMapping("/updateWorker/{id}")
    public Worker updateWorker(@PathVariable Integer id, @RequestBody Worker worker) {
        return workerService.updateWorker(id, worker);
    }

    @DeleteMapping("/deleteWorker/{id}")
    public String deleteWorker(@PathVariable Integer id) {
        workerService.deleteWorker(id);
        return "Worker with ID " + id + " deleted successfully.";
    }
}
