package com.appdevf2.bluehire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Client;
import com.appdevf2.bluehire.service.ClientService;



import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping("/postClient")
    public Client postClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }

    @GetMapping("/getAllClients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/getClient/{id}")
    public Client getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id);
    }


    @PutMapping("/updateClient/{id}")
    public Client updateClient(@PathVariable Integer id, @RequestBody Client client) {
        return clientService.updateClient(id, client);
    }

    @DeleteMapping("/deleteClient/{id}")
    public String deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return "Client with ID " + id + " deleted successfully.";
    }
}
