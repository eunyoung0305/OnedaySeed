package com.store.onedaySeed.repository;

import com.store.onedaySeed.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
}
