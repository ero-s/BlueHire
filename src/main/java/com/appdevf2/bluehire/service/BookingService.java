package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public List<Booking> getBookingsByClientUserId(int userId) {
    List<Booking> bookings = bookingRepository.findBookingsByClientUserId(userId);
        // Ensure lazy-loaded worker and client are fetched
        bookings.forEach(b -> {
            b.getWorker().getUser().getName();  // preload worker's name
            b.getClient().getUser().getName();  // preload client's name
        });
        return bookings;
    }

    public List<Booking> getBookingsByWorkerUserId(int userId) {
        List<Booking> bookings = bookingRepository.findBookingsByWorkerUserId(userId);

        // preload lazy fields to avoid lazy-loading issues
        bookings.forEach(b -> {
            b.getWorker().getUser().getName();
            b.getClient().getUser().getName();
        });

        System.out.println("Bookings for worker userId " + userId + ": " + bookings.size());
        return bookings;
    }

}
