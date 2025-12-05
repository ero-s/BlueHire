package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserService() {
    }

    public User postUserRecord(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Updated return type to Optional<User>
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // This method supports the Controller's /exists/{username} endpoint
    public boolean checkUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(Integer userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setPassword(updatedUser.getPassword());
                    user.setEmail(updatedUser.getEmail());
                    user.setAddress(updatedUser.getAddress());
                    user.setContactNumber(updatedUser.getContactNumber());
                    user.setName(updatedUser.getName());
                    // user.setCreatedAt(updatedUser.getCreatedAt()); // Careful with updating timestamps manually
                    user.setRole(updatedUser.getRole());
                    // user.setIsVerified(updatedUser.getIsVerified()); // Only update if necessary
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with ID " + userId));
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }


    public User authenticate(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password)) // Check if password matches
                .orElse(null); // Return null if not found or password incorrect
    }
}