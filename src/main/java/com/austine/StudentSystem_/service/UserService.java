package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.User;
import com.austine.StudentSystem_.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserService() {
        super();
    }

    public User postUserRecord(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
