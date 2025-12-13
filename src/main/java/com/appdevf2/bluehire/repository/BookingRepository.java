package com.appdevf2.bluehire.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdevf2.bluehire.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByWorker_WorkerID(int workerID);
    List<Booking> findByClient_ClientID(int clientID); 
}
