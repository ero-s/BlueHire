package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/postUser")
    public User postUser(@RequestBody User user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID " + id));
    }

    // ENDPOINT: Checks if username exists (Used by React Signup)
    @GetMapping("/exists/{username}")
    public boolean checkUsernameExists(@PathVariable String username) {
        return userService.checkUsernameExists(username);
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return "User with ID " + id + " deleted successfully.";
    }


    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
    // 2. Add the PostMapping
    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticate(loginRequest.username, loginRequest.password);

        if (user != null) {
            return org.springframework.http.ResponseEntity.ok(user);
        } else {
            return org.springframework.http.ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}