import BasicLaylout from "../../layouts/BasicLayout";
import React, {useEffect, useState} from "react";
import "./LoginForm.css"
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";


const NewUserPage=()=>{

    const [newMember,setNewMember] = useState({
        userId: "",
        password: "",
        userName: "",
        phoneNum: ""
    });

    const fetchData = async ()=> {
        try{
            const response = await axios.get("/api/userNew");
            setNewMember(response.data)
        }catch(error){
            console.log("Error fetching new user info : ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();





    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewMember((prevNewMember) => ({
            ...prevNewMember,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지


        if (newMember.userId == null) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (newMember.userId.length < 6 || newMember.userId.length > 12) {
            alert("아이디는 6자리 이상 12자리 이하로 입력해주세요.");
            return;
        }
        if (newMember.password == null) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        if (newMember.password.length < 6 || newMember.password.length > 12) {
            alert("비밀번호는 6자리 이상 12자리 이하로 입력해주세요.");
            return;
        }

        if (newMember.userName == null) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (newMember.phoneNum == null) {
            alert("전화번호를 입력해주세요.");
            return;
        }
        if (!/^\d+$/.test(newMember.phoneNum)) {
            alert("전화번호는 숫자만 입력해주세요.");
            return;
        }


        //
        // console.log(newMember.userId);
        // console.log(newMember.password);
        // console.log(newMember.userName);
        // console.log(newMember.phoneNum);

        try {
            const response = await axios.post("/api/userNew", {
                userId: newMember.userId,
                password: newMember.password,
                userName: newMember.userName,
                phoneNum: newMember.phoneNum,

            })
            if (response.data.alertMessage) {
                alert(response.data.alertMessage);
            }
            if (response.data.successMessage) {
                console.log('Form submitted successfully:', response.data.successMessage);

                const { userId, userName } = response.data;
                localStorage.setItem("userName", newMember.userName); // 사용자 이름을 로컬 스토리지에 저장


                fetchData();
                navigate("/user/login" ); //userName정보 가지고 가기
                // navigate("/user/login",{ state: { userName } }); //userName정보 가지고 가기
            }
        }catch (error){
            if(error.response){
                // 서버 응답이 에러인 경우
                console.error('Error submitting form:', error.response.data);
            }else if (error.request) {
                // 요청이 전혀 이루어지지 않은 경우
                console.error('Request error:', error.request);
            } else {
                // 기타 에러
                console.error('Unexpected error:', error.message);
            }
        }
    };




    return(
      <BasicLaylout>

      <div className="loginBox">
        <h1><b>회원가입</b></h1>
          <Form onSubmit={handleSubmit}>
            <span className="formName">아이디</span>
            <input className="formInfo" type="text" id="id_val" placeholder="아이디를 입력해주세요"  name="userId" onChange={handleInputChange} value={newMember.userId}/>
       
            <span className="formName">비밀번호</span>
            <input className="formInfo" type="password" id="password_val" placeholder="비밀번호를 입력해주세요" name="password" onChange={handleInputChange} value={newMember.password}/>

            <span className="formName" >이름</span>
            <input className="formInfo" type="text" id="name_val" placeholder="이름을 입력해주세요" name="userName" onChange={handleInputChange} value={newMember.userName} />

            <span className="formName">전화번호</span>
          <input className="formInfo" type="text" id="phoneNum_val" placeholder="전화번호를 입력해주세요" name="phoneNum" onChange={handleInputChange} value={newMember.phoneNum}/>

          <div className="loginBtn">
              <button type="submit">회원가입</button>
          </div>
          </Form>
      </div>
      </BasicLaylout>
      
    );
    }
export default NewUserPage;