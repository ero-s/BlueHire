package com.austine.StudentSystem_.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.austine.StudentSystem_.model.Administrator;
import com.austine.StudentSystem_.service.AdministratorService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/administrator")
public class AdministratorController {
    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/create")
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        return administratorService.createAdministrator(administrator);
    }

    @GetMapping("/get/{id}")
    public Administrator getAdministratorByID(@PathVariable int id) {
        return administratorService.getAdministratorById(id);
    }
    
    @GetMapping("/getAll")
    public List<Administrator> getAllAdministrators(){
        return administratorService.getAllAdministrators();
    }

    @PutMapping("/update")
    public Administrator updateAdministrator(@RequestParam int id, @RequestBody Administrator administrator) {
        return administratorService.updateAdministrator(id, administrator);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAdministrator(@PathVariable int id) {
        return administratorService.deleteAdministrator(id);
    }
}
