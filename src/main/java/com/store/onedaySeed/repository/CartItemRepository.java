package com.store.onedaySeed.repository;

import com.store.onedaySeed.dto.CartDto;
import com.store.onedaySeed.entity.Cart;
import com.store.onedaySeed.entity.CartItem;
import com.store.onedaySeed.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select new com.store.onedaySeed.dto.CartDto(ci.cartItemId, l.lessonName, l.lessonSchedule, ci.count, l.price) " +
            "from CartItem ci join ci.lesson l " +
            "where ci.cart.cartId = :cartId " +
            "order by ci.regTime desc")
    List<CartDto> findCartList(Long cartId);

    Optional<CartItem> findByCartAndLesson(Cart cart, Lesson lesson);
}