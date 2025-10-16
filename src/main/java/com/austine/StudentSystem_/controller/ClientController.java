package com.austine.StudentSystem_.controller;

import com.austine.StudentSystem_.model.Client;
import com.austine.StudentSystem_.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping("/getAllClients")
    public List<Client> getClients() {
        return clientService.getAllClients();
    }

    @PostMapping("postClient")
    public Client postClient(@RequestBody Client client) {
        return clientService.postClientRecord(client);
    }
}
