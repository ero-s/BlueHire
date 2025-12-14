package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; 
import com.fasterxml.jackson.databind.ObjectMapper; 

import com.appdevf2.bluehire.model.Client;
import com.appdevf2.bluehire.service.ClientService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {

    @Autowired
    private ClientService clientService;

    // ✅ UPDATED: POST endpoint with Mandatory File Upload
    @PostMapping(value = "/postClient", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postClient(
            @RequestPart("client") String clientJson,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "docType", defaultValue = "OTHER") String docType
    ) {
        // 1. Mandatory Check: Prevent Signup if no file is uploaded
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                .body("Registration Failed: You must upload a document for verification to sign up.");
        }

        try {
            // 2. Convert JSON String to Client Object
            ObjectMapper objectMapper = new ObjectMapper();
            Client client = objectMapper.readValue(clientJson, Client.class);

            // 3. Save Client with Document
            Client createdClient = clientService.createClientWithDocument(client, file, docType);
            
            return ResponseEntity.ok(createdClient);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing file or JSON: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error creating client: " + e.getMessage());
        }
    }

    // --- EXISTING ENDPOINTS ---

    @GetMapping("/getAllClients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/getClient/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        try {
            Client client = clientService.getClientById(id);
            return ResponseEntity.ok(client);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateClient/{id}")
    public Client updateClient(@PathVariable Integer id, @RequestBody Client client) {
        return clientService.updateClient(id, client);
    }

    @DeleteMapping("/deleteClient/{id}")
    public String deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return "Client with ID " + id + " deleted successfully.";
    }
}