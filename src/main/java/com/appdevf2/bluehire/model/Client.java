package com.appdevf2.bluehire.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@DiscriminatorValue("CLIENT")
public class Client extends User{
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private int clientId;

    public Client() {
        super();
    }

    // public Client(int clientId) {
    //     super();
    //     this.clientId = clientId;
    // }
    // public int getClientId() {
    //     return clientId;
    // }
    // public void setClientId(int clientId) {
    //     this.clientId = clientId;
    // }
}
