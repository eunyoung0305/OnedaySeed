package com.store.onedaySeed.repository;

import com.store.onedaySeed.entity.OrderItem;
import com.store.onedaySeed.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Orders orders);
}