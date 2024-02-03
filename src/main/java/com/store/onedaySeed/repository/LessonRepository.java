package com.store.onedaySeed.repository;

import com.store.onedaySeed.entity.Host;
import com.store.onedaySeed.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByHost(Host host);
}