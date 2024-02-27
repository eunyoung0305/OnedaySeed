//package com.store.onedaySeed.repository;
//
//import com.store.onedaySeed.entity.LessonImg;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface LessonImgRepository extends JpaRepository<LessonImg, Long> {
//    List<LessonImg> findByLessonIdOrderByIdAsc(Long lessonId);
//
//    //상품이 대표 이미지 찾기
//    LessonImg findByLessonIdAndRepImgYn(Long lessonId, String repImgYn) ;
//}