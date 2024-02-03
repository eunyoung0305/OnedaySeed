package com.store.onedaySeed.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartDto {
    private Long cartItemId;

    private Long lessonId;

    private String lessonName;

    private String lessonSchedule;

    private int count;

    private Long price;

    public CartDto() {
    }

    public CartDto(Long cartItemId, String lessonName, String lessonSchedule, int count, Long price) {
        this.cartItemId = cartItemId;
        this.lessonName = lessonName;
        this.lessonSchedule = lessonSchedule;
        this.count = count;
        this.price = price;
    }
}
