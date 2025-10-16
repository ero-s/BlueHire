package com.austine.StudentSystem_.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.austine.StudentSystem_.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
