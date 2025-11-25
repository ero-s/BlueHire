package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.repository.BookingRepository;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

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

        booking.setCreatedAt(newBooking.getCreatedAt());
        booking.setDescription(newBooking.getDescription());
        booking.setLocation(newBooking.getLocation());
        booking.setScheduledDateTime(newBooking.getScheduledDateTime());
        booking.setServiceCategory(newBooking.getServiceCategory());
        booking.setStatus(newBooking.getStatus());
        booking.setClient(newBooking.getClient());
        booking.setWorker(newBooking.getWorker());
        
        return bookingRepository.save(booking);
    }

    public String deleteBooking(Long id) {
        String msg = "";
        if(bookingRepository.findById(id).isPresent()){
            bookingRepository.deleteById(id);
            msg = "Booking with ID " + id + " deleted successfully.";
        }else{
            msg = "Booking with ID " + id + " not found.";
        }
        return msg;
    }
}
