package com.appdevf2.bluehire.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Booking;
import com.appdevf2.bluehire.model.Payment;
import com.appdevf2.bluehire.repository.BookingRepository;
import com.appdevf2.bluehire.repository.PaymentRepository;

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
        .orElseThrow(() -> new NoSuchElementException("Payment with ID " + id + " not found."));

        payment.setAmount(newPayment.getAmount());
        payment.setPaymentMethod(newPayment.getPaymentMethod());
        payment.setReceiptNo(newPayment.getReceiptNo());
        payment.setStatus(newPayment.getStatus());
        payment.setBooking(newPayment.getBooking());
        return paymentRepository.save(payment);
    }

    public String deletePayment(int id) {
        String msg = "";
        if(paymentRepository.findById(id).isPresent()){
            paymentRepository.deleteById(id);
            msg = "Payment with ID " + id + " deleted successfully.";
        }else{
            msg = "Payment with ID " + id + " not found.";
        }
        return msg;
    }
}
