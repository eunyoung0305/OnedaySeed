package com.store.onedaySeed.dto;

import com.store.onedaySeed.constant.LessonStatus;
import com.store.onedaySeed.entity.Lesson;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class LessonFormDto {

    // @NotBlank와 @NotEmpty 어노테이션은 문자열(String) 필드,
    // Integer 필드에는 @NotNull을 사용

    private Long lessonId;
    @NotBlank(message = "클래스명은 필수 입력값입니다.")
    private String lessonName;
    @NotNull(message = "판매가는 필수 입력값입니다.")
    private Long price;
    @NotBlank(message = "카테고리는 필수 입력값입니다.")
    private String lessonCategory;
    @NotBlank(message = "클래스 스케쥴은 필수 입력값입니다.")
    private String lessonSchedule;
    @NotNull(message = "인원수는 필수 입력값입니다.")
    private Integer lessonLimited; //재고

    private LessonStatus lessonStatus;
//    private List<LessonImgDto> lessonImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    public Lesson createLesson(){

        return modelMapper.map(this,Lesson.class);
    }

    //엔티티 객체와 dto 객체 변환(복사)
    public static LessonFormDto of(Lesson lesson){

        return modelMapper.map(lesson,LessonFormDto.class);
    }

}

