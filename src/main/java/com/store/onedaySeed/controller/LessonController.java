package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.LessonDto;
import com.store.onedaySeed.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    private String newHostNum;

    // 로그인 된 호스트 아이디 받기
    @PostMapping("/api/sendLessonHostNum")
    public ResponseEntity<?> sendUserId(@RequestBody Map<String, String> requestBody) {
        try {
            String hostNum = requestBody.get("hostNum");
            newHostNum = hostNum;
            System.out.println("받은 사용자 ID: " + hostNum);
            return ResponseEntity.ok("사용자 ID 전송 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/lessons/sendHostNum")
    public ResponseEntity<String> lessonHostNum() {
        return ResponseEntity.ok(newHostNum);
    }

    // 클래스 등록(host)
    @PostMapping("/host/lesson/new")
    public ResponseEntity<?> createLesson(@RequestBody LessonDto lessonDto) {
        try{
            return ResponseEntity.ok(lessonService.saveLesson(lessonDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create lesson. Error: " + e.getMessage());
        }
    }

    // 클래스 메인 조회(host)
    // hostNum 로그인시 수정 필요
    @GetMapping("/host/lesson/main")
    public List <LessonDto> lessonMain() {
        return lessonService.getLessonList(newHostNum);
    }

    // 클래스 조회(host)
    @GetMapping({"/host/lesson/modify/{lessonId}", "/user/lesson/detail/{lessonId}"})
    public ResponseEntity<LessonDto> getLessonById(@PathVariable Long lessonId) {
        LessonDto lessonDto = lessonService.getLessonById(lessonId);

        if (lessonDto != null) {
            return new ResponseEntity<>(lessonDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 클래스 수정(host)
    @PostMapping("/host/lesson/modify")
    public ResponseEntity<String> updateLesson(@RequestBody LessonDto lessonDto) {
        try {
            lessonService.updateLesson(lessonDto);
            return ResponseEntity.ok("레슨이 성공적으로 수정되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("레슨 수정 중 오류 발생: " + e.getMessage());
        }
    }

    // 클래스 삭제(host)
    @DeleteMapping("/host/lesson/delete/{lessonId}")
    public ResponseEntity<String> deleteLesson(@PathVariable Long lessonId) {
        try {
            lessonService.deleteLesson(lessonId);
            return ResponseEntity.ok("레슨이 성공적으로 삭제되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("레슨 삭제 중 오류 발생: " + e.getMessage());
        }
    }

    // 클래스 조회(user)
    @GetMapping("/user/lesson/list")
    public ResponseEntity<List<LessonDto>> lessonList() {
        try {
            List<LessonDto> lessons = lessonService.getAllLessons();
            return ResponseEntity.ok(lessons);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // 오류 발생 시 null 반환
        }
    }


//    @PostMapping(value = "new")
//    public ResponseEntity<Lesson> createLesson(@RequestPart("lessonRepImg") MultipartFile lessonRepImg,
//                                               @RequestPart("lessonDetailImg") MultipartFile lessonDetailImg,
//                                               @RequestPart("lessonName") String lessonName,
//                                               @RequestPart("lessonCategory") String lessonCategory,
//                                               @RequestPart("price") Long price,
//                                               @RequestPart("lessonLimited") Integer lessonLimited,
//                                               @RequestPart("lessonSchedule") String lessonSchedule,
//                                               @RequestPart("lessonStatus") String lessonStatus) {
//        Lesson lesson = new Lesson();
//        lesson.setLessonName(lessonName);
//        lesson.setLessonCategory(lessonCategory);
//        lesson.setPrice(price);
//        lesson.setLessonLimited(lessonLimited);
//        lesson.setLessonSchedule(lessonSchedule);
//        lesson.setLessonStatus(LessonStatus.valueOf(lessonStatus));
//
//        // 파일 저장 경로 설정 (경로는 알맞게 변경)
//        String repImgPath = ".../images/repImg/";
//        String detailImgPath = ".../images/detailImg/";
//
//        // 파일 저장 경로에 디렉토리가 없다면 생성
//        File repImgDirectory = new File(repImgPath);
//        File detailImgDirectory = new File(detailImgPath);
//
//        if (!repImgDirectory.exists()) {
//            repImgDirectory.mkdirs();
//        }
//
//        if (!detailImgDirectory.exists()) {
//            detailImgDirectory.mkdirs();
//        }
//
//        // 파일 저장할 경로와 이름 설정
//        String saveRepImg = repImgPath + lessonRepImg.getOriginalFilename();
//        String saveDetailImg = detailImgPath + lessonDetailImg.getOriginalFilename();
//
//        // 파일 저장
//        try {
//            lessonRepImg.transferTo(new File(saveRepImg));
//            lessonDetailImg.transferTo(new File(saveDetailImg));
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//
//        // 저장된 파일 이름을 엔터티에 설정
//        lesson.setLessonRepImg(lessonRepImg.getOriginalFilename());
//        lesson.setLessonDetailImg(lessonDetailImg.getOriginalFilename());
//
//        Lesson savedLesson = lessonService.saveLesson(lesson);
//
//        return ResponseEntity.ok(savedLesson);
//    }
}
