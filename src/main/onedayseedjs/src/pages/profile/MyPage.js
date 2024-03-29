import { Button, Form } from 'react-bootstrap';
import BasicLayout from '../../layouts/BasicLayout';

import './userProfile.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const MyPage = ()=>{

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userId = useSelector((state) => state.login.userId);
  const userName = useSelector((state) => state.login.userName);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('/api/sendUserId');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const navigate = useNavigate();

  const handleClickUser = () => {
    // '/user' 경로로 이동
    navigate('/user');
  };

  const handleClickCart = () => {
    // '/user' 경로로 이동
    navigate('/cart');
  };

  const handleClickOrder = () => {
    // '/user' 경로로 이동
    navigate('/order');
  };

  return (

      <>
        <BasicLayout>

          <h1 id="title">프로필 관리</h1>
          <Form >
            <img src={userData.img || "/profile.jpg"} width="200" height="200" alt="프로필 이미지" />
            <Form.Group className="mb-3" controlId="formGroupEmail" id="profile-form">
              <Form.Label className='name'>{userId}님, 반가워요!</Form.Label>
              {/* <Form.Control type="text" name="userId" value={users.userId} disabled /> */}
            </Form.Group>
            <Button id="modify" variant="primary" type="submit" onClick={handleClickUser}>
              프로필 수정
            </Button>
            <Button id="modify" variant="primary" type="submit" onClick={handleClickCart}>
              장바구니
            </Button>
            <Button id="modify" variant="primary" type="submit" onClick={handleClickOrder}>
              구매내역
            </Button>
          </Form>

        </BasicLayout>
      </>

  );




}
export default MyPage;