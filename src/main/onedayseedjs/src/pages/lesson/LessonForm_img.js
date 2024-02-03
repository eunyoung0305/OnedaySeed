import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BasicLayout from "../../layouts/BasicLayout"
import axios from 'axios';

function LessonForm() {
  const [lessonName, setLessonName] = useState("");
  const [lessonCategory, setLessonCategory] = useState("");
  const [price, setPrice] = useState("");
  const [lessonLimited, setLessonLimited] = useState("");
  const [lessonSchedule, setLessonSchedule] = useState();
  const [lessonStatus, setLessonStatus] = useState("");
  const [lessonRepImg, setLessonRepImg] = useState(null);
  const [lessonDetailImg, setLessonDetailImg] = useState(null);

  const handleInputChange = (e, setValue) => {
    // input의 현재 값에 접근
    const inputValue = e.target.value;
    console.log("입력값 불러: ", inputValue)
    // 상태 업데이트
    setValue(inputValue);
  };

  const handleFileChange = (e, setFile) => {
    // 파일 선택 시
    const file = e.target.files;
    console.log("파일 이름 불러", file)

    // 상태 업데이트
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('lessonName', lessonName);
    formData.append('lessonCategory', lessonCategory);
    formData.append('price', price);
    formData.append('lessonLimited', lessonLimited);
    formData.append('lessonSchedule', lessonSchedule);
    formData.append('lessonStatus', lessonStatus);
    formData.append('lessonRepImg', lessonRepImg);
    formData.append('lessonDetailImg', lessonDetailImg);



    console.log("진짜 개짜증나네: ", formData)
    axios.post('/api/lesson/new', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('서버로부터의 응답:', response.data);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  // const handleFileChange = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('lessonRepImg', lessonRepImg);
  //   formData.append('lessonDetailImg', lessonDetailImg);

  //   axios.post('/api/lesson/new', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     .then(response => {
  //       console.log('서버로부터의 응답:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('에러 발생:', error);
  //     });
  // };

  return (
    <div>
      <BasicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h1>클래스 등록 페이지입니다</h1><br></br>
            <div>
              <label>
                <h4>클래스 이름</h4>
                <input onChange={(e) => handleInputChange(e, setLessonName)} placeholder='제목을 입력해 주세요.' required />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>카테고리</h4>
                <input type='radio' value='cook' name='category' onChange={(e) => handleInputChange(e, setLessonCategory)} />
                요리
              </label>
              <label>
                <input type='radio' value='art' name='category' onChange={(e) => handleInputChange(e, setLessonCategory)} required />
                미술
              </label>
              <label>
                <input type='radio' value='music' name='category' onChange={(e) => handleInputChange(e, setLessonCategory)} />
                음악
              </label><br />
              <label>
                <input type='radio' value='sport' name='category' onChange={(e) => handleInputChange(e, setLessonCategory)} />
                운동
              </label>
              <label>
                <input type='radio' value='baking' name='category' onChange={(e) => handleInputChange(e, setLessonCategory)} />
                베이킹
              </label><br />
              <hr />
            </div>

            <div>
              <label>
                <h4>클래스 가격</h4>
                <input type='number' onChange={(e) => handleInputChange(e, setPrice)} placeholder='숫자만 입력해 주세요.' required /><br />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>제한 인원</h4>
                <input type='number' onChange={(e) => handleInputChange(e, setLessonLimited)} placeholder='숫자만 입력해 주세요.' required /><br />
              </label>
              <hr />
            </div>

            <div>
              <label>
                <h4>클래스 시작일</h4>
                <input type='date' onChange={(e) => handleInputChange(e, setLessonSchedule)} required /><br />
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

            <div>
              <label>
                <h4>이미지 등록</h4>
                - 썸네일 사진<br />
                <input type='file' name='lessonRepImg' onChange={(e) => handleFileChange(e, setLessonRepImg)} defaultValue="" /><br />
              </label>
              <label>
                - 상세 설명 사진<br />
                <input type='file' name='lessonDetailImg' onChange={(e) => handleFileChange(e, setLessonDetailImg)} defaultValue="" />
              </label>
            </div>
            <br />

            <button type='submit'>저장</button>

          </form>
        </div>
      </BasicLayout>
    </div>

  )

}

export default LessonForm;