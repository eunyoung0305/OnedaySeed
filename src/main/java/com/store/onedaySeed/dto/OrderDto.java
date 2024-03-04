package com.store.onedaySeed.dto;

import com.store.onedaySeed.constant.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OrderDto {
    private Long orderId; // Orders

    private String lessonName; // OrderItem - Lesson

    private String lessonSchedule; // Lesson

    private int count; // OrderItem

    private Long orderPrice; // OrderItem

    private OrderStatus orderStatus; // Orders

}
