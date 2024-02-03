import {Link, useNavigate} from "react-router-dom";
import BasicLaylout from "../../layouts/BasicLayout";
import "./LoginForm.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from "react-redux";
import {hostLogin as hostLoginAction} from "../../slices/hostLoginSlice";


const hostInitState={
    hostNum:"",
    password:""
}
const HostLoginPage = () => {
    const [login,setLogin] = useState({...hostInitState});
    const hostNum = useSelector((state) => state.hostLogin.hostNum);

    const isHostLoggedIn = useSelector((state) => state.hostLogin.isHostLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async()=>{
        try{
            const response = await axios.get("/api/hostLogin");
            setLogin(response.data);
        }catch (error){
            console.log('ERROR FETCHING HOST LOGIN : ', error);
        }
    };

    useEffect(() => {
        const isHostLoggedIn = localStorage.getItem('isHostLoggedIn');
        if (isHostLoggedIn) {
            // 로그인 상태인 경우 홈페이지로 이동
            navigate("/");
        }

        const hostName = localStorage.getItem("hostName");
        if (hostName) {
            // 사용자 이름이 있다면, 로그인 폼에 설정
            setLogin((prevLogin) => ({
                ...prevLogin,
                hostName: hostName
            }));
        }
    }, [navigate]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    //서버로 사용자 ID 전송(마이페이지)
    const sendUserIdToServer = async (hostNum) => {
        try {
            await axios.post("/api/sendHostNum",  { "hostNum": hostNum });
            await axios.post("/api/sendLessonHostNum",  { "hostNum": hostNum });
        } catch (error) {
            console.error('서버로 사용자 ID 전송 실패:', error);
        }
    };
    // const sendUserIdToServer = async (hostNum) => {
    //     try {
    //         await axios.post("/api/sendHostNum", { hostNum });
    //     } catch (error) {
    //         console.error('서버로 사용자 ID 전송 실패:', error);
    //     }
    // };

    // //서버로 사용자 ID 전송(레슨)
    // const sendUserIdToLesson = async (hostNum) => {
    //     try {
    //         await axios.post("/api/sendLessonHostNum", { hostNum });
    //     } catch (error) {
    //         console.error('서버로 사용자 ID 전송 실패:', error);
    //     }
    // };


    const handleSubmit = async (e) =>{
        // 새로고침 방지
        e.preventDefault();

        if (!login.hostNum) {
            alert("사업자번호를 입력해주세요.");
            return;
        }
        if (!login.password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        try{
            const response = await axios.post("/api/hostLogin",{

                hostNum: login.hostNum,
                password: login.password

            });

            if (response.data.alertMessage) {
                // 에러 또는 성공 메시지가 있으면 alert 창 띄우기
                alert(response.data.alertMessage);
            }

            if (response.data.successMessage) {
                console.log('Form submitted successfully:', response.data.successMessage);

                const { hostId, hostName } = response.data;

                // 로그인 성공 - 서버로 hostNum 전송
                sendUserIdToServer(login.hostNum);
                // sendUserIdToLesson(login.hostNum);

                localStorage.setItem("isHostLoggedIn", true);
                dispatch(hostLoginAction({
                    hostNum: login.hostNum,
                    hostName:  login.hostName,
                }));

                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                // 서버 응답이 에러인 경우
                console.error('Error submitting form:', error.response.data);
                // console.log(login.hostNum);
                // console.log(login.password);
                // 클라이언트에서 에러 메시지 처리 로직 추가
                alert(JSON.stringify(error.response.data));
                //글자 자르기


            } else if (error.request) {
                // 요청이 전혀 이루어지지 않은 경우
                console.error('Request error:', error.request);
            } else {
                // 기타 에러
                console.error('Unexpected error:', error.message);
            }
        }

    }

  return(
    <>

    <BasicLaylout>
    <div className="loginBox">
            <h1><b>로그인</b></h1>

                <Form onSubmit={handleSubmit}>
                <span className="formName">사업자번호</span>
                <input className="formInfo" type="text" id="id_val" name="hostNum" onChange={handleInputChange} value={login.hostNum} placeholder="사업자번호를 입력해주세요" />

                <span className="formName">비밀번호</span>
                <input className="formInfo" type="password" id="password_val" name="password"  onChange={handleInputChange} value={login.password}placeholder="비밀번호를 입력해주세요"/>

            <div className="loginBtn">
                <button className="s_bt" type="submit" >로그인</button>
            </div>
                </Form>

            <Link to={"/user/login"} className="another-login">게스트로 로그인하기</Link>

          <span className="choiceNewmember">아직 회원이 아니신가요?</span>
          <div className="newmember">
              <button className="another-btn"><Link to={"/host/new"}>호스트 회원가입</Link></button>
              <button className="another-btn"><Link to={"/user/new"}>게스트 회원가입</Link></button>
          </div>

          </div>
     </BasicLaylout>
    </>
  )
}
export default HostLoginPage;