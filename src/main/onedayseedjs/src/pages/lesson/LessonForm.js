import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import BasicLayout from "../../layouts/BasicLayout"
import axios from 'axios';
import "./Lesson.css";
import { useNavigate } from 'react-router';

function LessonForm() {
  // 호스트 로그인 구현시 호스트 번호 받을 수 있게 변경 필요
  const [hostNum, setHostNum] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [lessonCategory, setLessonCategory] = useState("");
  const [price, setPrice] = useState("");
  const [lessonLimited, setLessonLimited] = useState("");
  const [lessonSchedule, setLessonSchedule] = useState();
  const [lessonStatus, setLessonStatus] = useState("");
//  const hostNum = useSelector((state) => state.hostLogin.hostNum);

  const navigate =useNavigate();
  
  useEffect(() => {
    const fetchHostNum = async () => {
      try {
        const response = await axios.get('/api/lessons/sendHostNum');
        const hostNumFromServer = response.data;
        console.log('HostNum from server:', hostNumFromServer);

        setHostNum(hostNumFromServer);
      } catch (error) {
        console.error('호스트 번호 가져오기 실패:', error);
      }
    };

    // 컴포넌트가 마운트될 때 한 번 호출
    fetchHostNum();
  }, []);

  const handleInputChange = (e, setValue) => {
    // input의 현재 값에 접근
    const inputValue = e.target.value;

    // 상태 업데이트
    setValue(inputValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    const dataToSend = {
      hostNum,
      lessonName,
      lessonCategory,
      price,
      lessonLimited,
      lessonSchedule,
      lessonStatus,
    };

    axios.post('/host/lesson/new', dataToSend
    )
      .then(response => {
        console.log('서버로부터의 응답:', response.data.lessonName);
        alert("클래스 정보가 저장되었습니다");
        window.location.reload();
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  return (
    <div>
      <BasicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <form onSubmit={handleSubmit} >
            <h1 className="title-word"><b>클래스 등록 페이지</b></h1>
            <div>
              <label>
                <h4>클래스명</h4>
                <input className='styled-input2' onChange={(e) => handleInputChange(e, setLessonName)} placeholder='제목을 입력해 주세요.' required />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>카테고리</h4>
                <select className='' onChange={(e) => handleInputChange(e, setLessonCategory)} defaultValue="" required>
                  <option value="" disabled>선택</option>
                  <option value="요리">요리</option>
                  <option value="미술">미술</option>
                  <option value="음악">음악</option>
                  <option value="운동">운동</option>
                  <option value="베이킹">베이킹</option>
                </select><br />
              <hr />
              </label>
            </div>

            <div>
              <label>
                <h4>클래스 가격</h4>
                <input className='styled-input2' type='number' onChange={(e) => handleInputChange(e, setPrice)} placeholder='숫자만 입력해 주세요.' min='1' required /><br />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>제한 인원</h4>
                <input className='styled-input2' type='number' onChange={(e) => handleInputChange(e, setLessonLimited)} placeholder='숫자만 입력해 주세요.' min='1' required /><br />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>클래스 날짜</h4>
                <input className='styled-date' type='date' onChange={(e) => handleInputChange(e, setLessonSchedule)} required /><br />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>판매 상태</h4>
                <select onChange={(e) => handleInputChange(e, setLessonStatus)} defaultValue="" required>
                  <option value="" disabled>선택</option>
                  <option value='SELL'>판매중</option>
                  <option value='SOLD_OUT'>품절</option>
                </select><br />
                <hr />
              </label>     
            </div>
            <Button type='submit' className='modifyPageBtn'>저장</Button>
          </form>
        </div>
      </BasicLayout>
    </div>

  )

}

export default LessonForm;