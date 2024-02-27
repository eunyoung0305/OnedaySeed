//package com.store.onedaySeed.dto;
//
//import com.store.onedaySeed.entity.Lesson;
//import com.store.onedaySeed.entity.LessonImg;
//import lombok.Getter;
//import lombok.Setter;
//import org.modelmapper.ModelMapper;
//
////이미지 전달
//@Getter
//@Setter
//public class LessonImgDto {
//
//    private Long imgId;
//    private String imgName;
//    private String originImgName;
//    private String imgUrl;
//    private String repImgYn;//대표이미지
//
//    private static ModelMapper modelMapper = new ModelMapper();
//
//    public static LessonImgDto of(LessonImg lessonImg) {
//        return modelMapper.map(lessonImg, LessonImgDto.class);
//    }
//}
