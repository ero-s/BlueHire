package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // ---------------------- BASIC CRUD ----------------------

    @PostMapping("/postUser")
    public User postUser(@RequestBody User user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
       return userService.getUserById(id)
        .map(user -> ResponseEntity.ok(user))
        .orElse(ResponseEntity.status(404).body(null));
    }

    @GetMapping("/exists/{username}")
    public boolean checkUsernameExists(@PathVariable String username) {
        return userService.checkUsernameExists(username);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(id, user));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
    }

    // ---------------------- LOGIN ENDPOINT ----------------------

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        User user = userService.authenticate(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // ---------------------- REGISTER WITH FILE UPLOAD ----------------------

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(
            @RequestPart("user") String userJson,        // JSON user data
            @RequestPart(value = "file", required = false) MultipartFile file, // Optional file
            @RequestParam(value = "docType", defaultValue = "OTHER") String docType
    ) {
        try {
            // Convert JSON to User object
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            // Validate: username already used?
            if (userService.checkUsernameExists(user.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists");
            }

            // Service call
            User createdUser = userService.registerUserWithDocument(user, file, docType);
            return ResponseEntity.ok(createdUser);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload error: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Invalid request format: " + e.getMessage());
        }
    }
}
