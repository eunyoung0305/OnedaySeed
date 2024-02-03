import axios from "axios";
import {getCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";

const jwtAxios = axios.create()
const refreshJWT = async (accessToken, refreshToken) =>{
    const host = API_SERVER_HOST
    const header = {headers:{"Authorization":`Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/user/refresh?refreshToken=${refreshToken}`,header)

    console.log("------------------------")
    console.log(res.data)

    return res.data

}

//before request
const beforeReq = (config) =>{
    console.log("before Request...")

    const memberInfo = getCookie("member")

    if(!memberInfo){
        console.log("member not found")
        return Promise.reject({
            response:
                {data:{
                    error:"REQUIRE_LOGIN"
                    }}}
        )
    }

    const {accessToken}=memberInfo

    //Authorization 헤더처리
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}


//fail request
const requestFail = (err) =>{
    console.log("request error")

    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) =>{
    console.log("before return response....")

    return res
}

//fail response
const responseFail = (err) =>{
    console.log("response fail error.....")
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq,requestFail)
jwtAxios.interceptors.request.use(beforeRes,responseFail)
export default jwtAxios

