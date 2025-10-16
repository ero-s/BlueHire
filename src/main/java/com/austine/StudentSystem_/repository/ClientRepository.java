package com.austine.StudentSystem_.repository;

import com.austine.StudentSystem_.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client getClientByClientId(int clientId);
}
