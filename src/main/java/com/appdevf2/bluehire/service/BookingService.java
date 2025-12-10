package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Worker; // Import Worker
import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.WorkerRepository; // Import WorkerRepository

@Service
public class BookingService {
    
    @Autowired
    BookingRepository bookingRepository;

    // --- NEW: We need this to find the worker who is applying ---
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

    public Booking updateBooking(Long id, Booking newBooking) {
        Booking booking = bookingRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Booking with ID " + id + " not found."));

        booking.setJobTitle(newBooking.getJobTitle());
        booking.setDescription(newBooking.getDescription());
        booking.setLocation(newBooking.getLocation());
        booking.setScheduledDateTime(newBooking.getScheduledDateTime());
        booking.setServiceCategory(newBooking.getServiceCategory());
        booking.setStatus(newBooking.getStatus());
        
        // Only update relations if they are provided to avoid nulling them out accidentally
        if (newBooking.getClient() != null) booking.setClient(newBooking.getClient());
        if (newBooking.getWorker() != null) booking.setWorker(newBooking.getWorker());
        
        return bookingRepository.save(booking);
    }

    // =========================================================
    //  MISSING METHOD ADDED HERE: Logic to Apply/Assign Worker
    // =========================================================
    public Booking assignWorkerToBooking(Long bookingId, Integer workerId) {
        // 1. Find the Booking
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + bookingId));
        
        // 2. Security Check: Is it already taken?
        if (booking.getWorker() != null) {
            throw new RuntimeException("This job is already assigned to another worker.");
        }

        // 3. Find the Worker who clicked the button
        Worker worker = workerRepository.findById(workerId)
            .orElseThrow(() -> new NoSuchElementException("Worker not found with ID: " + workerId));

        // 4. Update the Booking Record in the Database
        booking.setWorker(worker);
        booking.setStatus(Booking.Status.Accepted); // Mark as Accepted so it leaves the "Pending" feed
        
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