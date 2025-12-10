package com.appdevf2.bluehire.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // Imports CrossOrigin, PutMapping, etc.

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.service.BookingService;

@CrossOrigin(origins = "http://localhost:5173") // Allow React to talk to this
@RestController
@RequestMapping("/booking")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
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

    // =========================================================
    //  MISSING ENDPOINT ADDED HERE
    // =========================================================
    @PutMapping("/apply/{bookingId}/{workerId}")
    public Booking applyForJob(@PathVariable Long bookingId, @PathVariable Integer workerId) {
        return bookingService.assignWorkerToBooking(bookingId, workerId);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        return bookingService.deleteBooking(id);
    }
}