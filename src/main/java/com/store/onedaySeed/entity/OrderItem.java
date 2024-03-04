package com.store.onedaySeed.entity;

import exception.OutOfLimitedException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

//주문상품
@Entity
@Table(name="order_item")
@Getter
@Setter
@ToString
public class OrderItem extends BaseEntity{

    @Id
    @Column(name = "order_item_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id")
    private Orders order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="lesson_id")
    private Lesson lesson;

    private int count;

    private Long orderPrice;

    @CreatedDate
    public static OrderItem createOrderItem(Lesson lesson, int count) {
        OrderItem orderItem = new OrderItem();
        orderItem.setLesson(lesson);
        orderItem.setCount(count);

        long total = lesson.getPrice() * count;
        orderItem.setOrderPrice(total);

        lesson.removeLimited(count);
        return orderItem;
    }


//    public long getTotalPrice(){
//        return orderPrice*count;
//    }

//    public void cancel(){
//        this.getLesson().addLimited(count);
//    }
}


