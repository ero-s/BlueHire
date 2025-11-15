package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Client;
import com.appdevf2.bluehire.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public ClientService() {
        super();
    }

    // CREATE
    public Client postClientRecord(Client client) {
        return clientRepository.save(client);
    }

    // READ ALL
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // READ ONE
    public Optional<Client> getClientByID(Integer clientId) {
        return clientRepository.findById(clientId);
    }

    // UPDATE
    public Client updateClient(Integer clientId, Client updatedClient) {
        return clientRepository.findById(clientId)
                .map(client -> {
                    client.setName(updatedClient.getName());
                    client.setEmail(updatedClient.getEmail());
                    client.setAddress(updatedClient.getAddress());
                    client.setPhotoURL(updatedClient.getPhotoURL());
                    client.setRole(updatedClient.getRole());
                    client.setUsername(updatedClient.getUsername());
                    client.setPassword(updatedClient.getPassword());
                    client.setVerified(updatedClient.getVerified());
                    return clientRepository.save(client);
                })
                .orElseThrow(() -> new RuntimeException("Client not found with ID " + clientId));
    }

    // DELETE
    public void deleteClient(Integer clientId) {
        clientRepository.deleteById(clientId);
    }
}
