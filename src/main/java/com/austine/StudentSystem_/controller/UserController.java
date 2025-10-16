package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.User;
import com.austine.StudentSystem_.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/postUserRecord")
    public User postUser(@RequestBody User user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}

