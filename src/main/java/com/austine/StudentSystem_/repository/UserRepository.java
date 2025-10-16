package com.austine.StudentSystem_.repository;

import com.austine.StudentSystem_.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByUserName(String userName);
}
