import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicLayout from "../../layouts/BasicLayout"
import "./Lesson.css";

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
        <section className='lessonMainForm'>
          <div style={{textAlign: "center"}} >
            <b>
              <h1 className="title-word"><b>등록된 CLASS 목록 및 현황</b></h1>
               
                <button className='classPlusBtn'><Link to="/lesson/new" className="w-btn-green btn" type="button">클래스 등록</Link></button>
            </b>
          </div>
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div style={{textAlign: "center"}} key={lesson.lessonId} className='lessonListBox'>
                <div onClick={() => handleLessonClick(lesson.lessonId)}>
                  {/* <img src="/images/boonga.jpg" width="200px" height="200px" alt="fox" /> */}
                 {lesson.lessonName} | {lesson.price} 원 | {lesson.lessonSchedule} 
                  </div>
              </div>
            ))
          ) : (
            <h1 style={{textAlign: "center"}}>등록한 클래스가 없습니다.</h1>
          )}<br />
        </section>
      </BasicLayout>
    </div>
  );
}

export default LessonMain;