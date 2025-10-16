package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Client;
import com.austine.StudentSystem_.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
    public ClientService() {
        super();
    }

    public Client postClientRecord(Client client) {
        return clientRepository.save(client);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
