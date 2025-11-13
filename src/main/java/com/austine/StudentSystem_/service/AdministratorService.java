package com.austine.StudentSystem_.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.austine.StudentSystem_.model.Administrator;
import com.austine.StudentSystem_.repository.AdministratorRepository;

@Service
public class AdministratorService {
    @Autowired
    AdministratorRepository administratorRepository;

    public Administrator createAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    public Administrator getAdministratorById(int id) {
        return administratorRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Administrator with ID " + id + " not found."));
    }

    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    public Administrator updateAdministrator(int id, Administrator newAdministrator) {
        Administrator administrator = administratorRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Administrator with ID " + id + " not found."));
        
        administrator.setName(newAdministrator.getName());
        administrator.setEmail(newAdministrator.getEmail());
        administrator.setContactNumber(newAdministrator.getContactNumber());
        administrator.setAddress(newAdministrator.getAddress());
        administrator.setUsername(newAdministrator.getUsername());
        administrator.setPassword(newAdministrator.getPassword());
        administrator.setRole(newAdministrator.getRole());
        administrator.setVerified(newAdministrator.getVerified());
        administrator.setPhotoURL(newAdministrator.getPhotoURL());
        
        return administratorRepository.save(administrator);
    }
    
    public String deleteAdministrator(int id) {
        String msg = "";
        if(administratorRepository.findById(id).isPresent()){
            administratorRepository.deleteById(id);
            msg = "Administrator with ID " + id + " deleted successfully.";
        }else{
            msg = "Administrator with ID " + id + " not found.";
        }
        return msg;
    }
}
