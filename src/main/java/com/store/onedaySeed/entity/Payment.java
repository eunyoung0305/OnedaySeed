package com.store.onedaySeed.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name="payment")
@Getter
@Setter
@ToString
public class Payment extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Orders order;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

    //주문 총 금액  == total fee
    @Column(nullable = false)
     private Long amount;

    





}
