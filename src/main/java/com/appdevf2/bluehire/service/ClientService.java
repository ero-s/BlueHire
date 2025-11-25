package com.appdevf2.bluehire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Client;
import com.appdevf2.bluehire.model.User;
import com.appdevf2.bluehire.repository.ClientRepository;
import com.appdevf2.bluehire.repository.UserRepository;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    public ClientService() {
        super();
    }

    // ✅ CREATE
    public Client createClient(Client client) {
        User user = client.getUser();
        if (user != null) {
            userRepository.save(user);
        }
        return clientRepository.save(client);
    }

    // ✅ READ ALL
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // ✅ READ ONE
    public Client getClientById(Integer clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(() -> new NoSuchElementException("Client not found with ID " + clientId));
    }

    // ✅ UPDATE
    public Client updateClient(Integer clientId, Client updatedClient) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new NoSuchElementException("Client not found with ID " + clientId));

        User updatedUser = updatedClient.getUser();
        if (updatedUser != null) {
            User user = client.getUser();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setAddress(updatedUser.getAddress());
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setIsVerified(updatedUser.getIsVerified());
            user.setPhotoURL(updatedUser.getPhotoURL());

            userRepository.save(user);
        }

        return clientRepository.save(client);
    }

    // ✅ DELETE
    public String deleteClient(Integer clientId) {
        if (clientRepository.findById(clientId).isPresent()) {
            clientRepository.deleteById(clientId);
            return "Client with ID " + clientId + " deleted successfully.";
        } else {
            return "Client with ID " + clientId + " not found.";
        }
    }
}
