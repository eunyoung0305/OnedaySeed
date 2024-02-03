package com.store.onedaySeed.service;

import com.store.onedaySeed.constant.OrderStatus;
import com.store.onedaySeed.dto.CartOrderDto;
import com.store.onedaySeed.dto.OrderDto;
import com.store.onedaySeed.entity.Lesson;
import com.store.onedaySeed.entity.OrderItem;
import com.store.onedaySeed.entity.Orders;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.repository.LessonRepository;
import com.store.onedaySeed.repository.OrderItemRepository;
import com.store.onedaySeed.repository.OrdersRepository;
import com.store.onedaySeed.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final OrdersRepository ordersRepository;
    private final OrderItemRepository orderItemRepository;

    // 장바구니에서 넘어옴
    @Transactional
    public Long orders(CartOrderDto cartOrderDto, String userId) {
        User user = userRepository.findByUserId(userId);

        Lesson lesson = lessonRepository.findById(cartOrderDto.getLessonId())
                .orElseThrow(EntityNotFoundException::new);

        OrderItem orderItem = OrderItem.createOrderItem(lesson, cartOrderDto.getCount());

        Orders orders = Orders.createOrder(user, orderItem);
        ordersRepository.save(orders);

        return orders.getOrderId();
    }
    
    // 주문 목록 조회
    public List<OrderDto> getOrderList(String userId) {
        List<Orders> orders = ordersRepository.findByUserUserId(userId);
        List<OrderDto> orderDtoList = new ArrayList<>();

        for(Orders order : orders) {
            OrderDto orderDto = new OrderDto();
            orderDto.setOrderId(order.getOrderId());

            List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

            for(OrderItem orderItem : orderItems) {
                Lesson lesson = orderItem.getLesson();

                orderDto.setLessonName(lesson.getLessonName());
                orderDto.setLessonSchedule(lesson.getLessonSchedule());
                orderDto.setCount(orderItem.getCount());
                orderDto.setOrderPrice(orderItem.getOrderPrice());
                orderDto.setOrderStatus(order.getOrderStatus());

                orderDtoList.add(orderDto);

            }
        }
        return orderDtoList;
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("주문을 찾을 수 없습니다. ID: " + orderId));

        order.setOrderStatus(OrderStatus.CANCEL);

        OrderItem orderItem = order.getOrderItems().stream().findFirst().orElse(null);
        if (orderItem != null) {
            Lesson lesson = orderItem.getLesson();
            if (lesson != null) {
                // 재고 수량 증가
                lesson.addLimited(orderItem.getCount());
            }
        }

        ordersRepository.save(order);
    }
}
