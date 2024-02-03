import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicLayout from "../../layouts/BasicLayout"

function LessonMain() {

  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get('/host/lesson/main');
        setLessons(response.data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchLessons();
  }, []);

  const handleLessonClick = (lessonId) => {
    // 각 레슨의 상세 페이지로 이동
    navigate('/lesson/modify', { state: { lessonId: lessonId } });
  };


  return (
    <div>
      <BasicLayout>
        <section>
          <div style={{textAlign: "center"}}>
            <b>
              <span className="title-word">등록하신 CLASS 목록 및 현황 </span>
              <Link to="/lesson/new" className="w-btn-green btn" type="button">
                클래스 등록
              </Link>
            </b>
          </div>
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div style={{textAlign: "center"}} key={lesson.lessonId}>
                <div onClick={() => handleLessonClick(lesson.lessonId)}>
                  {/* <img src="/images/boonga.jpg" width="200px" height="200px" alt="fox" /> */}
                  <span> </span>{lesson.lessonName}
                  <span> </span>| {lesson.price} 원 | {lesson.lessonSchedule} <div><br /></div>
                  </div>
              </div>
            ))
          ) : (
            <p>등록한 클래스가 없습니다.</p>
          )}<br />
        </section>
      </BasicLayout>
    </div>
  );
}

export default LessonMain;