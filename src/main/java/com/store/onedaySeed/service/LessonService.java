package com.store.onedaySeed.service;

import com.store.onedaySeed.dto.LessonDto;
import com.store.onedaySeed.entity.Host;
import com.store.onedaySeed.entity.Lesson;
import com.store.onedaySeed.repository.HostRepository;
import com.store.onedaySeed.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LessonService {

    private final LessonRepository lessonRepository;
    private final HostRepository hostRepository;

    // 클래스 등록(host)
    public LessonDto saveLesson(LessonDto lessonDto) {
        Lesson lesson = new Lesson(lessonDto);

        Host host = hostRepository.findById(lessonDto.getHostNum())
                .orElseThrow(() -> new RuntimeException("Host를 찾을 수 없습니다."));

        lesson.setHost(host);

        Lesson savedLesson = lessonRepository.save(lesson);

        return new LessonDto(savedLesson);
    }

    // 클래스 메인(host)
    public List<LessonDto> getLessonList(String hostNum) {
        List<LessonDto> lessonList = new ArrayList<>();

        // HostRepository를 통해 Host 엔티티를 가져옴
        Host host = hostRepository.findByHostNum(hostNum);

        // LessonRepository의 findByHost 메소드에 Host 엔티티를 전달
        List<Lesson> lessons = lessonRepository.findByHost(host);

        for (Lesson lesson : lessons) {
            LessonDto lessonDto = new LessonDto(lesson);
            lessonList.add(lessonDto);
        }
        return lessonList;
    }

    // 클래스 조회(host)
    public LessonDto getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (lesson != null) {
            return new LessonDto(lesson);
        }
        return null;
    }

    // 클래스 수정(host)
    public void updateLesson(LessonDto lessonDto) {
        Lesson existingLesson = lessonRepository.findById(lessonDto.getLessonId()).orElse(null);

        if(existingLesson != null) {
            existingLesson.setLessonName(lessonDto.getLessonName());
            existingLesson.setLessonCategory(lessonDto.getLessonCategory());
            existingLesson.setPrice(lessonDto.getPrice());
            existingLesson.setLessonLimited(lessonDto.getLessonLimited());
            existingLesson.setLessonSchedule(lessonDto.getLessonSchedule());
            existingLesson.setLessonStatus(lessonDto.getLessonStatus());

            lessonRepository.save(existingLesson);

            new LessonDto(existingLesson);
        } else {
            throw new RuntimeException("해당 ID의 레슨이 존재하지 않습니다.");
        }
    }

    // 클래스 삭제(host)
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("해당 ID의 레슨이 존재하지 않습니다."));

        lessonRepository.delete(lesson);
    }

    // 클래스 조회(user)
    public List<LessonDto> getAllLessons() {
        try {
            List<LessonDto> lessonList = new ArrayList<>();
            List<Lesson> lessons = lessonRepository.findAll();

            for (Lesson lesson : lessons) {
                LessonDto lessonDto = new LessonDto(lesson);
                lessonList.add(lessonDto);
            }
            return lessonList;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
