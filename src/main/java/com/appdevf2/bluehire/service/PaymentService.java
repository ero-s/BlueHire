package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Payment;
import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.PaymentRepository;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    BookingRepository bookingRepository;

    public Payment createPayment(Payment payment) {
        Long bookingId = payment.getBooking().getBookingID();

        Booking existingBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NoSuchElementException("Booking with ID " + bookingId + " not found"));

        payment.setBooking(existingBooking);

        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Payment with ID " + id + " not found."));
    }

    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    public Payment updatePayment(int id, Payment newPayment) {
        Payment payment = paymentRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(
                "Payment with ID " + id + " not found."
            ));

        // ✅ Update ONLY editable fields
        if (newPayment.getAmount() != null) {
            payment.setAmount(newPayment.getAmount());
        }

        if (newPayment.getPaymentMethod() != null) {
            payment.setPaymentMethod(newPayment.getPaymentMethod());
        }

        if (newPayment.getReceiptNo() != null) {
            payment.setReceiptNo(newPayment.getReceiptNo());
        }

        if (newPayment.getStatus() != null) {
            payment.setStatus(newPayment.getStatus());
        }

        // ❌ DO NOT TOUCH booking
        // payment.setBooking(...);

        return paymentRepository.save(payment);
    }

    @Transactional
    public void deletePayment(int paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

        Booking booking = payment.getBooking();

        booking.setPayment(null);

        paymentRepository.delete(payment);
    }

}
