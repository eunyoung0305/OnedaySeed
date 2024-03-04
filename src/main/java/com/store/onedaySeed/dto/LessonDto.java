package com.store.onedaySeed.dto;

import com.store.onedaySeed.constant.LessonStatus;
import com.store.onedaySeed.entity.Lesson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LessonDto {

    private String hostNum;
    private Long lessonId;
    private String lessonName;
    private String lessonCategory;
    private Long price;
    private String lessonSchedule;
    private Integer lessonLimited;
//    private String lessonDetailInfo;
    private LessonStatus lessonStatus;

    public LessonDto(Lesson lesson) {
        if (lesson.getHost() != null) {
            this.hostNum = lesson.getHost().getHostNum();
            this.lessonId = lesson.getLessonId();
            this.lessonName = lesson.getLessonName();
            this.lessonCategory = lesson.getLessonCategory();
            this.price = lesson.getPrice();
            this.lessonSchedule = lesson.getLessonSchedule();
            this.lessonLimited = lesson.getLessonLimited();
            this.lessonStatus = lesson.getLessonStatus();
        } else {
            this.lessonId = lesson.getLessonId();
            this.lessonName = lesson.getLessonName();
            this.lessonCategory = lesson.getLessonCategory();
            this.price = lesson.getPrice();
            this.lessonSchedule = lesson.getLessonSchedule();
            this.lessonLimited = lesson.getLessonLimited();
            this.lessonStatus = lesson.getLessonStatus();
        }
    }
}