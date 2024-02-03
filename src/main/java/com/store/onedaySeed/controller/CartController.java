package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.CartDto;
import com.store.onedaySeed.service.CartService;
import exception.OutOfLimitedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private String newUserId;

    // 로그인 된 유저 아이디 받기
    @PostMapping("/api/cart/sendUserId")
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

    // 장바구니 담기
    @PostMapping("/api/addCart")
    public ResponseEntity<String> addToCart(@RequestBody CartDto cartDto) {
        try {
            if (newUserId == null) {
                return ResponseEntity.badRequest().body("로그인이 필요합니다.");
            }

            boolean addedToCart = cartService.addToCart(newUserId, cartDto.getLessonId(), cartDto.getCount());

            if (addedToCart) {
                return ResponseEntity.ok("장바구니에 강의가 추가되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("장바구니에 이미 해당 강의가 있습니다.");
            }
        }catch (OutOfLimitedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니에 강의를 추가하는 중에 오류가 발생했습니다.");
        }
    }


    // 장바구니 조회
    @GetMapping("/api/cart")
    public List<CartDto> cartList() {
        List<CartDto> cartDtoList = cartService.getCartList(newUserId);
        return cartDtoList;
    }

    // 장바구니 수정(count 업데이트)
    @PostMapping("/api/cart")
    public ResponseEntity<?> cartUpdate(@RequestBody CartDto cartDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "변경사항 저장에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            cartService.updateCart(cartDto);
            // 수정 성공시, 클라이언트에게 성공 메시지 전송
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("successMessage", "장바구니가 저장되었습니다.");
            successResponse.put("alertMessage", "장바구니가 저장되었습니다.");

            return ResponseEntity.ok(successResponse);

        } catch (Exception e){
            Map<String, String> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "변경사항 저장에 실패했습니다.");
            errors.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
    }

    // 장바구니 삭제
    @DeleteMapping("/api/cart/{cartItemId}")
    public @ResponseBody ResponseEntity deleteCartItem(@PathVariable("cartItemId") Long cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }

    // 주문하기
    @PostMapping("/api/cart/order/{cartItemId}")
    public @ResponseBody ResponseEntity orderCartItem(@PathVariable("cartItemId") Long cartItemId) {
        try {
            Long orderId = cartService.orderCartItem(cartItemId, newUserId);
            return new ResponseEntity<>(orderId, HttpStatus.OK);
        } catch (OutOfLimitedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("주문 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    @PostMapping("/api/cart/order/{cartItemId}")
//    public @ResponseBody ResponseEntity orderCartItem(@PathVariable("cartItemId") Long cartItemId) {
//        try {
//            Long orderId = cartService.orderCartItem(cartItemId, "hong");
//            return new ResponseEntity<>(orderId, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>("주문 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
