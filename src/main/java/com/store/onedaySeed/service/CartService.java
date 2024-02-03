package com.store.onedaySeed.service;

import com.store.onedaySeed.dto.CartDto;
import com.store.onedaySeed.dto.CartOrderDto;
import com.store.onedaySeed.entity.Cart;
import com.store.onedaySeed.entity.CartItem;
import com.store.onedaySeed.entity.Lesson;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.repository.CartItemRepository;
import com.store.onedaySeed.repository.CartRepository;
import com.store.onedaySeed.repository.LessonRepository;
import com.store.onedaySeed.repository.UserRepository;
import exception.OutOfLimitedException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderService orderService;
    private final LessonRepository lessonRepository;
    
    // 장바구니 담기
    @Transactional
    public boolean addToCart(String userId, Long lessonId, int count) {
        try {
            if (userId == null) {
                return false;
            }

            Lesson lesson = lessonRepository.findById(lessonId).orElse(null);

            if (lesson == null) {
                return false;
            }

            // 강의 상태 확인
            lesson.removeLimitedCart(count);

            // 장바구니에 강의 정보 추가하는 로직
            User user = userRepository.findById(userId).orElse(null);

            if (user == null) {
                return false;
            }

            Cart cart = cartRepository.findByUser_userId(user.getUserId());

            // 최초로 담는 경우 카트가 없으면 생성
            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
                cart = cartRepository.save(cart);
            }

            // 장바구니에 해당 강의가 이미 담겨있는지 확인
            Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndLesson(cart, lesson);

            if (existingCartItem.isPresent()) {
                return false;
            }

            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setLesson(lesson);
            cartItem.setCount(count);

            cartItemRepository.save(cartItem);

            return true; // 장바구니에 성공적으로 추가되었음을 반환
        } catch (OutOfLimitedException e) {
            return false;
        }
    }

    // 장바구니 조회
    public List<CartDto> getCartList(String userId) {
        List<CartDto> cartList = new ArrayList<>();
        User user = userRepository.findByUserId(userId);
        Cart cart = cartRepository.findByUser_userId(user.getUserId());

        if(cart == null) {
            return cartList;
        }

        cartList = cartItemRepository.findCartList(cart.getCartId());
        return cartList;
    }

    // 장바구니 수정
    @Transactional
    public void updateCart(CartDto cartDto) throws EntityNotFoundException {
        Optional<CartItem> optionalCart = cartItemRepository.findById(cartDto.getCartItemId());

        if (optionalCart.isPresent()) {
            CartItem cartItem = optionalCart.get();
            cartItem.setCount(cartDto.getCount());

            cartItemRepository.save(cartItem);
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

    // 장바구니 삭제
    public void deleteCartItem(Long cartItemId) {
        try {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(EntityNotFoundException::new);
            cartItemRepository.delete(cartItem);
        } catch (EntityNotFoundException e) {
            // 엔티티가 존재하지 않는 경우에 대한 예외 처리
            throw new RuntimeException("Entity not found for deletion.", e);
        }
    }

    // 주문하기
    @Transactional
    public Long orderCartItem(Long cartItemId, String userId) {
        try {
            // 장바구니 아이템 조회
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new IllegalArgumentException("장바구니 아이템을 찾을 수 없습니다. ID: " + cartItemId));

            // 주문 DTO 생성
            CartOrderDto cartOrderDto = new CartOrderDto();
            cartOrderDto.setLessonId(cartItem.getLesson().getLessonId());
            cartOrderDto.setCount(cartItem.getCount());

            // 주문 서비스 호출
            Long orderId = orderService.orders(cartOrderDto, userId);

            // 주문이 성공적으로 처리되면 장바구니 아이템 삭제
            cartItemRepository.delete(cartItem);

            return orderId;
        } catch (Exception e) {
            // 클라이언트에게 오류 메시지 전달
            throw new RuntimeException("주문 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    }

}
