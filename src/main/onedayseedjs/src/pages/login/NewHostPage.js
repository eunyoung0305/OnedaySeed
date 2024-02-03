import BasicLaylout from "../../layouts/BasicLayout";
import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const NewHostPage = () => {
    const [newMember, setNewMember] = useState({
        hostNum: "",
        password: "",
        hostName: "",
        phoneNum: "",
    });

    const [isLicenseChecked, setIsLicenseChecked] = useState(false); // 사업자등록번호 확인 여부 상태 변수 추가

    const navigate = useNavigate();

    const fetchData = async ()=> {
        try{
            const response = await axios.get("/api/hostNew");
            setNewMember(response.data)
        }catch(error){
            console.log("Error fetching new host info : ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewMember((prevNewMember) => ({
            ...prevNewMember,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        if (!newMember.hostNum) {
            alert("사업자번호를 입력해주세요.");
            return;
        }

        if (!/^\d{10}$/.test(newMember.hostNum)) {
            alert("사업자번호는 숫자 10자리로 입력해주세요.");
            return;
        }

        if (!newMember.password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if (newMember.password.length < 6 || newMember.password.length > 12) {
            alert("비밀번호는 6자리 이상 12자리 이하로 입력해주세요.");
            return;
        }

        if (!newMember.hostName) {
            alert("상호명을 입력해주세요.");
            return;
        }

        if (!newMember.phoneNum) {
            alert("전화번호를 입력해주세요.");
            return;
        }

        if (!/^\d+$/.test(newMember.phoneNum)) {
            alert("전화번호는 숫자만 입력해주세요.");
            return;
        }
        if (!isLicenseChecked) { // 사업자등록번호 확인 여부 체크
            alert("사업자등록번호 조회를 해주세요."); // 알림 메시지 표시
            return;
        }

        try {
            const response = await axios.post("/api/hostNew", {
                hostNum: newMember.hostNum,
                password: newMember.password,
                hostName: newMember.hostName,
                phoneNum: newMember.phoneNum,
            });

            if (response.data.alertMessage) {
                alert(response.data.alertMessage);
            }
            if (response.data.successMessage) {
                console.log('Form submitted successfully:', response.data.successMessage);

                const{hostNum, hostName} =  response.data;
                localStorage.setItem("hostName", newMember.hostName); // 사용자 이름을 로컬 스토리지에 저장
                fetchData();

                navigate("/host/login");
            }
        }catch (error){
            if(error.response){
                // 서버 응답이 에러인 경우
                console.error('Error submitting form:', error.response.data);
                console.log("에러");
            }else if (error.request) {
                // 요청이 전혀 이루어지지 않은 경우
                console.error('Request error:', error.request);
                console.log("에러");
            } else {
                // 기타 에러
                console.error('Unexpected error:', error.message);
                console.log("에러");
            }
        }
    };

    const handleCheckLicenseNumber = async () => {
        try {
            const licenseNumber = newMember.hostNum;
            const data = { b_no: [licenseNumber] };

            const serviceKey = "jNJwXhsGE%2BR4ssYCiosHjGYR%2FzyXPcxd0kTjAMRluKEZ7UNjAf0G37HlXVE5YGQBs5LgDaSfEdI1K%2F%2B3%2Buf1rQ%3D%3D";
            const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;

            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const statusCd = response.data.data[0].b_stt_cd;
            const licenseNo = response.data.data[0].b_no;

            if (statusCd === '01') {
                setIsLicenseChecked(true); // 사업자등록번호 확인 완료 상태 업데이트
                alert(`사업자등록번호 ${licenseNo} 는(은) 정상 사업자입니다.`);
            } else {
                setIsLicenseChecked(false); // 사업자등록번호 확인 완료 상태 업데이트
                alert(`사업자등록번호 ${licenseNo} 는(은) 유효하지 않은 사업자등록번호입니다.`);
                setNewMember((prevNewMember) => ({
                    ...prevNewMember,
                    hostNum: "",
                }));
            }
        } catch (error) {
            console.error("Error checking license number:", error);
            console.log("에러 발생");
        }
    };

    return (
        <>
            <BasicLaylout>
                <div className="loginBox">
                    <h1>
                        <b>회원가입</b>
                    </h1>
                    <Form onSubmit={handleSubmit}>

                        <span className="formName">사업자번호</span>
                        <div className="hostNumBox">
                            <input className="formInfo"

                                   type="text"
                                   placeholder="사업자번호를 입력해주세요"
                                   name="hostNum"
                                   onChange={handleInputChange}
                                   value={newMember.hostNum}
                            />
                            <button type="button" className="checkButton" onClick={handleCheckLicenseNumber}>
                                사업자번호 확인
                            </button>
                        </div>
                        <span className="formName">비밀번호</span>
                        <input
                            className="formInfo"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            name="password"
                            onChange={handleInputChange}
                            value={newMember.password}
                        />

                        <span className="formName">상호명</span>
                        <input
                            className="formInfo"
                            type="text"
                            placeholder="상호명을 입력해주세요"
                            name="hostName"
                            onChange={handleInputChange}
                            value={newMember.hostName}
                        />

                        <span className="formName">전화번호</span>
                        <input
                            className="formInfo"
                            type="text"
                            placeholder="전화번호를 입력해주세요"
                            name="phoneNum"
                            onChange={handleInputChange}
                            value={newMember.phoneNum}
                        />

                        <div className="loginBtn">
                            <button type="submit">회원가입</button>
                        </div>
                    </Form>
                </div>
            </BasicLaylout>
        </>
    );
};

export default NewHostPage;
