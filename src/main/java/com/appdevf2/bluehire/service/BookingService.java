package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.WorkerRepository;

@Service
public class BookingService {
    
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    WorkerRepository workerRepository; 

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Booking with ID " + id + " not found."));
    }

    // --- FIXED METHOD ---
    public Booking updateBooking(Long id, Booking newBooking) {
        Booking booking = bookingRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Booking with ID " + id + " not found."));

        // ONLY update fields if they are NOT null in the request
        if (newBooking.getJobTitle() != null) {
            booking.setJobTitle(newBooking.getJobTitle());
        }
        if (newBooking.getDescription() != null) {
            booking.setDescription(newBooking.getDescription());
        }
        if (newBooking.getLocation() != null) {
            booking.setLocation(newBooking.getLocation());
        }
        if (newBooking.getScheduledDateTime() != null) {
            booking.setScheduledDateTime(newBooking.getScheduledDateTime());
        }
        if (newBooking.getServiceCategory() != null) {
            booking.setServiceCategory(newBooking.getServiceCategory());
        }
        if (newBooking.getStatus() != null) {
            booking.setStatus(newBooking.getStatus());
        }
        
        // Update Relations only if provided
        if (newBooking.getClient() != null) {
            booking.setClient(newBooking.getClient());
        }
        if (newBooking.getWorker() != null) {
            booking.setWorker(newBooking.getWorker());
        }
        
        return bookingRepository.save(booking);
    }

    public Booking assignWorkerToBooking(Long bookingId, Integer workerId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + bookingId));
        
        if (booking.getWorker() != null) {
            throw new RuntimeException("This job is already assigned to another worker.");
        }

        Worker worker = workerRepository.findById(workerId)
            .orElseThrow(() -> new NoSuchElementException("Worker not found with ID: " + workerId));

        booking.setWorker(worker);
        booking.setStatus(Booking.Status.Pending); 
        
        return bookingRepository.save(booking);
    }

    public String deleteBooking(Long id) {
        if(bookingRepository.findById(id).isPresent()){
            bookingRepository.deleteById(id);
            return "Booking with ID " + id + " deleted successfully.";
        } else {
            return "Booking with ID " + id + " not found.";
        }
    }
}