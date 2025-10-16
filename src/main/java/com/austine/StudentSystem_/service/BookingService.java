package com.austine.StudentSystem_.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.austine.StudentSystem_.model.Booking;
import com.austine.StudentSystem_.repository.BookingRepository;

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

    public Booking updateBooking(int id, Booking newBooking) {
        Booking booking = bookingRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Booking with ID " + id + " not found."));

        booking.setCreatedAt(newBooking.getCreatedAt());
        booking.setDescription(newBooking.getDescription());
        booking.setLocation(newBooking.getLocation());
        booking.setScheduledDateTime(newBooking.getScheduledDateTime());
        booking.setServiceCategory(newBooking.getServiceCategory());
        booking.setStatus(newBooking.getStatus());

        return bookingRepository.save(booking);
    }

    public String deleteBooking(int id) {
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
