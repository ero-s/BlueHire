package com.appdevf2.bluehire.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Client;
import com.appdevf2.bluehire.model.Worker;
import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.ClientRepository;
import com.appdevf2.bluehire.repository.PaymentRepository;
import com.appdevf2.bluehire.repository.ReportRepository;
import com.appdevf2.bluehire.repository.ReviewRepository;
import com.appdevf2.bluehire.repository.WorkerRepository;
import jakarta.transaction.Transactional;

@Service
public class BookingService {
    
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    WorkerRepository workerRepository; 

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ClientRepository clientRepository;

    public Booking createBooking(Booking booking) {
        if (booking.getClient() != null) {
            Client client = clientRepository.findById(booking.getClient().getClientID())
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
            booking.setClient(client);
        }
        booking.setStatus(booking.getStatus() != null ? booking.getStatus() : Booking.Status.Pending);
        booking.setCreatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }

    public Booking createBooking(Booking booking, Integer clientId) {
        Client client = clientRepository.findById(clientId)
            .orElseThrow(() -> new NoSuchElementException("Client not found with ID: " + clientId));
        booking.setClient(client);

        booking.setStatus(booking.getStatus() != null ? booking.getStatus() : Booking.Status.Pending);
        booking.setCreatedAt(LocalDateTime.now());

        // Set default date if missing or invalid
        if (booking.getScheduledDateTime() == null) {
            booking.setScheduledDateTime(LocalDateTime.now());
        }

        booking.setWorker(null); // no worker assigned yet
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

    @Transactional
    public String deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + id));

        bookingRepository.delete(booking);
        return "Booking deleted successfully";
    }

    public List<Booking> getBookingsByWorker(int workerId) {
        return bookingRepository.findByWorker_WorkerID(workerId);
    }

    public List<Booking> getBookingsByClient(int clientId) {
        return bookingRepository.findByClient_ClientID(clientId);
    }
}