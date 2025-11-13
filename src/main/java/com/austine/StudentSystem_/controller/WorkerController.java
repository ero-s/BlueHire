package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.Worker;
import com.austine.StudentSystem_.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @PostMapping("/postWorker")
    public Worker postWorker(@RequestBody Worker worker) {
        return workerService.postWorkerRecord(worker);
    }

    @GetMapping("/getAllWorkers")
    public List<Worker> getAllWorkers() {
        return workerService.getAllWorkerRecord();
    }

    @GetMapping("/getWorker/{id}")
    public Worker getWorkerById(@PathVariable Integer id) {
        return workerService.getWorkerById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found with ID " + id));
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
