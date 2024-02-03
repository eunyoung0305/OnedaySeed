import {Link, useNavigate} from "react-router-dom";
import BasicLaylout from "../../layouts/BasicLayout";
import "./LoginForm.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAction} from "../../slices/loginSlice";
import {Form} from "react-bootstrap";
import axios from "axios";



const initState={
    userId:"",
    password:""
}
const UserLoginPage =()=>{

    const [login,setLogin] = useState({...initState});

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async()=>{
        try{
            const response = await axios.get("/api/userLogin");
            setLogin(response.data);
        }catch (error){
            console.log('ERROR FETCHING USER LOGIN : ', error);
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            // 로그인 상태인 경우 홈페이지로 이동
            navigate("/");
        }

        const userName = localStorage.getItem("userName");
        if (userName) {
            // 사용자 이름이 있다면, 로그인 폼에 설정
            setLogin((prevLogin) => ({
                ...prevLogin,
                userName: userName
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

    // 서버로 사용자 ID 전송(마이페이지)
    const sendUserIdToServer = async (userId) => {
        try {
          await axios.post("/api/sendUserId", { userId });
        } catch (error) {
          console.error('서버로 사용자 ID 전송 실패:', error);
        }
      };

      // 서버로 사용자 ID 전송(카트)
      const sendUserIdToCart = async (userId) => {
        try {
          await axios.post("/api/cart/sendUserId", { userId });
        } catch (error) {
          console.error('서버로 사용자 ID 전송 실패:', error);
        }
      };

      // 서버로 사용자 ID 전송(오더)
      const sendUserIdToOrder = async (userId) => {
        try {
          await axios.post("/api/order/sendUserId", { userId });
        } catch (error) {
          console.error('서버로 사용자 ID 전송 실패:', error);
        }
      };
    const handleSubmit = async (e) => {

        // 새로고침 방지
        e.preventDefault();

        if (!login.userId) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (!login.password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        // console.log(login.userId);
        // console.log(login.password);

        try {
            const response = await axios.post("/api/userLogin", {
                userId: login.userId,
                password: login.password

            });

            if (response.data.alertMessage) {
                // 에러 또는 성공 메시지가 있으면 alert 창 띄우기
                alert(response.data.alertMessage);
            }

            if (response.data.successMessage) {
                console.log('Form submitted successfully:', response.data.successMessage);

                const { userId, userName } = response.data;

                // console.log("가지고 가는 유저 아이디와 이름 : ")
                // console.log(userId,userName);

                // 로그인 성공 - 서버로 사용자ID 전송
                sendUserIdToServer(login.userId);
                sendUserIdToCart(login.userId);
                sendUserIdToOrder(login.userId);

                localStorage.setItem("isLoggedIn", true);
                dispatch(loginAction({
                    userId: login.userId,
                    userName: login.userName, // userName 정보를 Redux 상태에 저장 , 해당 부분의 login은 현재페이지의 값 아닌가?
                }));


                navigate("/");
            }

        } catch (error) {
            if (error.response) {
                // 서버 응답이 에러인 경우
                console.error('Error submitting form:', error.response.data);
                // 에러 메시지가 있는 경우, 해당 메시지를 alert 창에 표시
                alert(JSON.stringify(error.response.data));
                //글자 자르기
                return;
                // alert(error.response.data);
                // 클라이언트에서 에러 메시지 처리 로직 추가
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
            <span className="formName">아이디</span>
            <input className="formInfo" type="text" id="id_val" placeholder="아이디를 입력해주세요" name="userId" value={login.userId} onChange={handleInputChange}></input>

            <span className="formName">비밀번호</span>
            <input className="formInfo" type="password" id="password_val" placeholder="비밀번호를 입력해주세요" name="password" value={login.password} onChange={handleInputChange}></input>



          <div className="loginBtn">
           <button className="s_bt" type="submit" >로그인</button>
            </div>

            </Form>

        <Link to={"/host/login"} className="another-login">호스트로 로그인하기</Link>

      <span className="choiceNewmember">아직 회원이 아니신가요?</span>
      <div className="newmember">
          <button className="another-btn"><Link to={"/host/new"} >호스트 회원가입</Link></button>
          <button className="another-btn"><Link to={"/user/new"} >게스트 회원가입</Link></button>
      </div>

      </div>
      </BasicLaylout>
      </>
    )

}
export default UserLoginPage;

