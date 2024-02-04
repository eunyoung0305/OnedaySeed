import React, { useEffect, useState } from 'react';
import BasicLayout from "../../layouts/BasicLayout"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Lesson.css";

function LessonDetail() {
  const location = useLocation();
  const [lessonDetail, setLessonDetail] = useState({});
  const lessonId = location.state ? location.state.lessonId : null;
  const [numberOfStudents, setNumberOfStudents] = useState(1);

  // 조회
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // lessonId가 존재하는 경우에만 서버에 요청
        if (lessonId) {
          const response = await axios.get(`/user/lesson/detail/${lessonId}`);
          setLessonDetail(response.data);
        } else {
          console.error('lessonId가 없습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  // 인원수 저장
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setNumberOfStudents(value);
    }
  };

  // 장바구니
  const handleAddToCart = async () => {
    try {
      // 서버에 POST 요청 보내기
      await axios.post('/api/addCart', {
        count: numberOfStudents,
        lessonId: lessonDetail.lessonId,
      });

      // 장바구니에 담기 성공 메시지 또는 다른 처리
      console.log('장바구니에 담기 성공!');
      alert("장바구니에 담겼습니다.");
      window.location.reload();
    } catch (error) {
      console.error('장바구니에 담기 실패:', error);
      alert("장바구니에 담는 중 오류가 발생했습니다");
      window.location.reload();
    }
  };

  return (
    <div>

      <BasicLayout>
        <hr />
        <form action="/cart" method="get">
          <fieldset style={{ textAlign: "center" }}>
            <img style={{ width: "600px", height: "600px" }} src="/boonga.jpg" width="800" />
            <p className='fontNaming'>
              <label className='btn fontNaming' id="fontNaming">🌱 클래스명 : {lessonDetail.lessonName}<br /></label>

            </p>

            <p className='fontNaming'>
              <label className='btn fontNaming' id="fontNaming" >🌱 클래스 날짜 : {lessonDetail.lessonSchedule}<br /> </label>

            </p>

            <p className='fontNaming'>
              <label className='fontNaming' id="fontNaming">🌱 인원 : &nbsp; <input value={numberOfStudents}
                                                                                 className='styled-input' type='number'
                                                                                 id='classStudentNum'
                                                                                 onChange={handleInputChange}
                                                                                 min='1'  style={{ width: "100px", height: "80px" }}></input></label>

            </p>

            <p className='fontNaming'>
              <label className='btn fontNaming' id="fontNaming">🌱 클래스 가격 : {lessonDetail.price}<br /></label>
            </p>

            <button id="cartBtn" className='btn w-btn-indigo-outline w-btn-green styled-input fontNaming' type="button" onClick={handleAddToCart}>
              CART
            </button>
          </fieldset>
          <hr />
          <div style={{ textAlign: "center" }}>
            <img src="/boonga2.jpeg" width="800" />
            <br />
            <img src="/boonga3.jpeg" width="800" />
          </div>
        </form>
      </BasicLayout>
    </div>

  )

}

export default LessonDetail;