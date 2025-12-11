package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.service.WorkerService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/worker")
// @CrossOrigin(origins = "http://localhost:5173") // Uncomment if needed
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @PostMapping(value = "/postWorker", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postWorker(
            @RequestPart("worker") String workerJson,
            // Keep required = false so we can handle the error message manually below
            @RequestPart(value = "file", required = false) MultipartFile file, 
            @RequestParam(value = "docType", defaultValue = "OTHER") String docType
    ) {
        try {
            // --- 1. ENFORCE DOCUMENT UPLOAD ---
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body("Registration Failed: You must upload a document for verification to sign up.");
            }

            // --- 2. Process JSON ---
            ObjectMapper objectMapper = new ObjectMapper();
            Worker worker = objectMapper.readValue(workerJson, Worker.class);

            // --- 3. Save Worker with Document ---
            // We proceed directly to the logic that handles documents
            Worker createdWorker = workerService.createWorkerWithDocument(worker, file, docType);
            
            return ResponseEntity.ok(createdWorker);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing file or JSON: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error creating worker: " + e.getMessage());
        }
    }

    // --- EXISTING ENDPOINTS ---

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