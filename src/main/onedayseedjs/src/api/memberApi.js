import {API_SERVER_HOST} from "./todoApi"
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/user/login`
export const loginPost = async (loginParam) =>{
    const header = {headers: {"ContextType":"x-www-form-urlencoded"}}

    const form = new FormData()
    form.append("userId",loginParam.userId)
    form.append("userPassword",loginParam.userPassword)

    const res = await jwtAxios.post(`${host}`, form, header)

    return res.data
}