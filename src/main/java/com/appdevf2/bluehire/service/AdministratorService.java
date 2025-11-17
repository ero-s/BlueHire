package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Administrator;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.repository.AdministratorRepository;
import com.appdevf2.bluehire.repository.UserRepository;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create Administrator with reference to User
    public Administrator createAdministrator(Administrator administrator) {
        // Ensure the User exists before saving Administrator
        User user = administrator.getUser();
        if (user != null) {
            userRepository.save(user);
        }
        return administratorRepository.save(administrator);
    }

    // ✅ Get by ID
    public Administrator getAdministratorById(int id) {
        return administratorRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Administrator with ID " + id + " not found."));
    }

    // ✅ Get all
    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    // ✅ Update Administrator (including updating User info)
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

    // ✅ Delete Administrator
    public String deleteAdministrator(int id) {
        if (administratorRepository.findById(id).isPresent()) {
            administratorRepository.deleteById(id);
            return "Administrator with ID " + id + " deleted successfully.";
        } else {
            return "Administrator with ID " + id + " not found.";
        }
    }
}
