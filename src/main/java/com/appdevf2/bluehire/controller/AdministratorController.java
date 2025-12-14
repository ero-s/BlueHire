package com.appdevf2.bluehire.controller;

import java.util.List;
import java.util.Map; // ✅ Added

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin; // ✅ Added
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.appdevf2.bluehire.model.Administrator;
import com.appdevf2.bluehire.service.AdministratorService;

@RestController
@RequestMapping("/administrator")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Added for Frontend Access
public class AdministratorController {
    
    @Autowired
    private AdministratorService administratorService;

    // ✅ NEW ENDPOINT: Dashboard Stats
    // Frontend calls: http://localhost:8080/administrator/stats
    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        return administratorService.getDashboardStats();
    }

    // --- EXISTING ENDPOINTS ---

    @PostMapping("/create")
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        return administratorService.createAdministrator(administrator);
    }

    @GetMapping("/get/{id}")
    public Administrator getAdministratorByID(@PathVariable int id) {
        return administratorService.getAdministratorById(id);
    }
    
    @GetMapping("/getAll")
    public List<Administrator> getAllAdministrators(){
        return administratorService.getAllAdministrators();
    }

    @PutMapping("/update")
    public Administrator updateAdministrator(@RequestParam int id, @RequestBody Administrator administrator) {
        return administratorService.updateAdministrator(id, administrator);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAdministrator(@PathVariable int id) {
        return administratorService.deleteAdministrator(id);
    }
}