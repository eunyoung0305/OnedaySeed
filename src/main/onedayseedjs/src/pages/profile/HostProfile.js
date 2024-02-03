import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './userProfile.css';
import BasicLayout from "../../layouts/BasicLayout"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function HostProfile() {
    // 비밀번호 이슈로 추가
    const [host, setHost] = useState({
      hostNum: '',
      hostName: '',
      password: '',
      phoneNum: '',
    });

    // 비밀번호 이슈로 추가
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate()

    const fetchData = async () => {
      try {
          const response = await axios.get('/api/host');
          setHost(response.data);
      } catch (error) {
          console.error('Error fetching host details:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setHost((prevUsers) => ({
        ...prevUsers,
        [name]: value,
      }));
    };

    // 비밀번호 이슈로 추가
    const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // 기본 폼 제출 방지

      // 비밀번호 유효성 검사 추가
      if (!newPassword) {
        alert('비밀번호를 입력하세요.');
        return;
      }

      // 비밀번호 이슈로 수정
      try {
        const response = await axios.post('/api/host', {
        hostNum: host.hostNum,
        hostName: host.hostName,
        password: newPassword,
        phoneNum: host.phoneNum,
      });

        if (response.data.alertMessage) {
          // 에러 또는 성공 메시지가 있으면 alert 창 띄우기
          alert(response.data.alertMessage);
        }

        if (response.data.successMessage) {
          console.log('Form submitted successfully:', response.data.successMessage);
          fetchData();
          navigate("/host/myPage");
        }
      } catch (error) {
          if (error.response) {
            // 서버 응답이 에러인 경우
            console.error('Error submitting form:', error.response.data);
            // 클라이언트에서 에러 메시지 처리 로직 추가
          } else if (error.request) {
            // 요청이 전혀 이루어지지 않은 경우
            console.error('Request error:', error.request);
          } else {
            // 기타 에러
            console.error('Unexpected error:', error.message);
          }
      }
    };

    return (
      <div>
        <BasicLayout>
        <h1 id="title">프로필 관리</h1>
        {/* <img src="/profile.jpg" width="200px" height="200px" alt="프로필 이미지" /> */}

        <Form onSubmit={handleSubmit}>
          {/* <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>사진 수정</Form.Label>
            <Form.Control type="file" size="sm" />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>사업자번호</Form.Label>
            <Form.Control type="text" name="hostNum" value={host.hostNum} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>비밀번호</Form.Label>
            {/* 비밀번호 이슈로 수정 */}
            <Form.Control
              type="password"
              name="password"
              value={newPassword || ''}
              placeholder="Enter New Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              name="hostName"
              value={host.hostName || ''}
              placeholder="Name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>핸드폰번호</Form.Label>
            <Form.Control
              type="text"
              name="phoneNum"
              value={host.phoneNum || ''}
              placeholder="- 없이 입력해주세요"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button id="modify" variant="primary" type="submit">
            수정완료
          </Button>
        </Form>
        </BasicLayout>
      </div>
    );
  }
  
  export default HostProfile;