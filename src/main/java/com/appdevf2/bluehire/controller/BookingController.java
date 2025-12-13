package com.appdevf2.bluehire.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.service.BookingService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/booking")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking, @RequestParam Integer clientId) {
        return bookingService.createBooking(booking, clientId);
    }

    @GetMapping("/get/{id}")
    public Booking getBookingByID(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }
    
    @GetMapping("/getAll")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PutMapping("/update")
    public Booking updateBooking(@RequestParam Long id, @RequestBody Booking booking) {
        return bookingService.updateBooking(id, booking);
    }

    @PutMapping("/apply/{bookingId}/{workerId}")
    public Booking applyForJob(@PathVariable Long bookingId, @PathVariable Integer workerId) {
        return bookingService.assignWorkerToBooking(bookingId, workerId);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        return bookingService.deleteBooking(id);
    }

    @GetMapping("/worker/{workerId}")
    public List<Booking> getBookingsByWorker(@PathVariable int workerId) {
        return bookingService.getBookingsByWorker(workerId);
    }

    @GetMapping("/client/{clientId}")
    public List<Booking> getBookingsByClient(@PathVariable int clientId) {
        return bookingService.getBookingsByClient(clientId);
    }
}