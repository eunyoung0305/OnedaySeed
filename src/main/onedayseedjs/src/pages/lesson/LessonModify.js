import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import BasicLayout from "../../layouts/BasicLayout"
import axios from 'axios';
import "./Lesson.css";

function LessonModify() {
  const location = useLocation();
  const [lesson, setLesson] = useState({});
  const lessonId = location.state ? location.state.lessonId : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: value,
    }));
  };

  // 조회
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // lessonId가 존재하는 경우에만 서버에 요청
        if (lessonId) {
          const response = await axios.get(`/host/lesson/modify/${lessonId}`);
          setLesson(response.data);
        } else {
          console.error('lessonId가 없습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  // 수정
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 여기서 lesson을 서버로 전송
      await axios.post('/host/lesson/modify', lesson);
      console.log('수정 성공!');
      alert("수정이 완료되었습니다");
      window.location.href = '/lesson/main';
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      // 삭제 요청을 서버로 보냄
      await axios.delete(`/host/lesson/delete/${lessonId}`);
      console.log('삭제 성공!');
      alert("삭제가 완료되었습니다");
      window.location.replace('/lesson/main');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div>
      <BasicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <form onSubmit={handleSubmit}>
            <h1 className="title-word"><b>클래스 수정 페이지</b></h1><br></br>
            <div>
              <label>
                <h4>클래스명</h4>
                {/* name 속성 추가 */}
                <input name="lessonName" className='styled-input2' value={lesson.lessonName || ''} onChange={handleInputChange} required />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>카테고리</h4>
                {/* name 속성 추가 */}
                <select name="lessonCategory" className='' value={lesson.lessonCategory || ''} onChange={handleInputChange} required>
                  <option value="" disabled>선택</option>
                  <option value='cook'>요리</option>
                  <option value='art'>미술</option>
                  <option value='music'>음악</option>
                  <option value='sport'>운동</option>
                  <option value='baking'>베이킹</option>
                </select><br />
                <hr />
              </label>
            </div>

            <div>
              <label>
                <h4>클래스 가격</h4>
                {/* name 속성 추가 */}
                <input name="price" className='styled-input2' value={lesson.price || ''} type='number' onChange={handleInputChange} min='1' required /><br />
                <hr />
              </label>
            </div>

            <div>
              <label>
                <h4>제한 인원</h4>
                {/* name 속성 추가 */}
                <input name="lessonLimited" className='styled-input2' value={lesson.lessonLimited || ''} type='number' onChange={handleInputChange} min='1' required /><br />
                <hr />
              </label>
            </div>

            <div>
              <label>
                <h4>클래스 날짜</h4>
                {/* name 속성 추가 */}
                <input name="lessonSchedule" className='styled-date' value={lesson.lessonSchedule || ''} type='date' onChange={handleInputChange} required /><br />
                <hr />
              </label>
            </div>

            <div>
              <label>
                <h4>판매 상태</h4>
                {/* name 속성 추가 */}
                <select name="lessonStatus" value={lesson.lessonStatus || ''} onChange={handleInputChange} required>
                  <option value="" disabled>선택</option>
                  <option value='SELL'>판매중</option>
                  <option value='SOLD_OUT'>품절</option>
                </select><br />
                <hr />
              </label>     
            </div>
            <Button type='submit' className='modifyPageBtn'>수정</Button>
            <Button onClick={handleDelete} className='modifyPageBtn'>삭제</Button>
          </form>
        </div>
      </BasicLayout>
    </div>

  )
}

export default LessonModify;
