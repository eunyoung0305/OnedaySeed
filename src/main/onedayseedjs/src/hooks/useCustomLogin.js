import {createSearchParams, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginPostAsync, logout} from "../slices/loginSlice";

const useCustomLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginSlice) //로그인,로그아웃 했을 경우의 상태
    const isLogin = loginState.userId ?true :false //로그인 여부

    // const doLogin = async (loginParam) => { //로그인 함수
    //     const action = await dispatch(loginPostAsync(loginParam))
    //
    //     return action.payload
    // }

    const doLogout =() => { //로그아웃 함수
        dispatch(logout())
    }

    const moveToPath = (path) =>{ //페이지 이동
        navigate({pathname:path},{replace:true})
    }

    const moveToLogin = () => { //로그인페이지로 이동
        navigate({pathname:'/user/login'},{replace:true})
    }

    const moveToLoginReturn = () => { //로그인페이지로 이동 페이지(로그인해야지만 이용 가능한 페이지 클릭(이동시))
        return<Navigate replace to="/user/login" />
    }

    const exceptionHandle = (ex) =>{
        console.log("Exception..........")
        console.log(ex)
        const errorMsg = ex.response.data.error
        const errorStr = createSearchParams({error:errorMsg}).toString()

        if(errorMsg === 'REQUIRE_LOGIN'){
            alert("로그인을 진행해주세요!")
            navigate({pathname:'/user/login',search:errorStr})
            return
        }
        if(ex.response.data.error === "ERROR_ACCESSDENIED"){
            alert("해당 메뉴를 사용할 권한이 없습니다.")
            navigate({pathname:'/user/login',search:errorStr})
            return
        }
    }

    return{loginState, isLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle}
}
export default useCustomLogin;