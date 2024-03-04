package com.store.onedaySeed.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartOrderDto {

    @Min(value = 1, message = " 최소 인원은 1명 이상입니다.")
    @Max(value = 20, message = " 최대 인원은 20명 이하입니다." )
    private int count;

    @NotNull(message="클래스 아이디는 필수 입력입니다.")
    private Long lessonId;
}
