package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.HashMap; // ✅ Added
import java.util.Map;     // ✅ Added

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Administrator;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.model.Document; // ✅ Added
import com.appdevf2.bluehire.repository.AdministratorRepository;
import com.appdevf2.bluehire.repository.UserRepository;
import com.appdevf2.bluehire.repository.DocumentRepository; // ✅ Added

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentRepository documentRepository; // ✅ Injected Document Repo

    // ✅ NEW METHOD: Get Dashboard Stats
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // 1. Fetch all users to calculate counts
        List<User> allUsers = userRepository.findAll();

        long totalUsers = allUsers.size();

        long totalClients = allUsers.stream()
                .filter(u -> u.getRole() != null && "CLIENT".equalsIgnoreCase(u.getRole()))
                .count();

        long totalWorkers = allUsers.stream()
                .filter(u -> u.getRole() != null && "WORKER".equalsIgnoreCase(u.getRole()))
                .count();

        // 2. Count Documents currently in 'PENDING' status
        long pendingDocs = documentRepository.findAll().stream()
                .filter(d -> d.getStatus() == Document.Status.PENDING)
                .count();

        // 3. Populate Map
        stats.put("users", totalUsers);
        stats.put("clients", totalClients);
        stats.put("workers", totalWorkers);
        stats.put("queue", pendingDocs);

        return stats;
    }

    // --- EXISTING METHODS ---

    public Administrator createAdministrator(Administrator administrator) {
        User user = administrator.getUser();
        if (user != null) {
            userRepository.save(user);
        }
        return administratorRepository.save(administrator);
    }

    public Administrator getAdministratorById(int id) {
        return administratorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrator with ID " + id + " not found."));
    }

    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    public Administrator updateAdministrator(int id, Administrator updatedAdmin) {
        Administrator admin = administratorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrator with ID " + id + " not found."));

        User updatedUser = updatedAdmin.getUser();
        if (updatedUser != null) {
            User user = admin.getUser();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setContactNumber(updatedUser.getContactNumber());
            user.setAddress(updatedUser.getAddress());
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setIsVerified(updatedUser.getIsVerified());
            user.setPhotoURL(updatedUser.getPhotoURL());

            userRepository.save(user);
        }

        return administratorRepository.save(admin);
    }

    public String deleteAdministrator(int id) {
        if (administratorRepository.findById(id).isPresent()) {
            administratorRepository.deleteById(id);
            return "Administrator with ID " + id + " deleted successfully.";
        } else {
            return "Administrator with ID " + id + " not found.";
        }
    }
}