//package com.store.onedaySeed.entity;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "lesson_img")
//@Getter
//@Setter
//public class LessonImg extends BaseEntity{
//
//    @Id
//    @Column(name = "lesson_img_id")
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long imgId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="lesson_id")
//    private Lesson lesson;
//
//    private String imgName;
//    private String originImgName;
//    private String imgUrl;
//    private String repImgYn;
//
//    public void updateItemImg(String imgName, String imgUrl, String originImgName) {
//        this.imgName = imgName;
//        this.imgUrl = imgUrl;
//        this.originImgName = originImgName;
//    }
//
//}
