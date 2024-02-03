package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.OrderDto;
import com.store.onedaySeed.repository.OrdersRepository;
import com.store.onedaySeed.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private String newUserId;

    // 로그인 된 유저 아이디 받기
    @PostMapping("/api/order/sendUserId")
    public ResponseEntity<?> sendUserId(@RequestBody Map<String, String> requestBody) {
        try {
            String userId = requestBody.get("userId");
            newUserId = userId;
            System.out.println("받은 사용자 ID: " + userId);
            return ResponseEntity.ok("사용자 ID 전송 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 구매내역 조회하기 (로그인 정보가 없어서 일단 Principal 제외)
    // 썸네일 이미지 가져오는 것도 필요
    @GetMapping("/api/orders")
    public List<OrderDto> orderList() {
        List<OrderDto> orderDtoList = orderService.getOrderList(newUserId);
        System.out.println("Order DTO List: " + orderDtoList);
        return orderDtoList;
    }

    // 구매 취소
    @PostMapping("/api/orders/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("주문이 취소되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("취소 중 오류가 발생했습니다.");
        }
    }
}