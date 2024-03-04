import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const hostLoginSlice = createSlice({
    name: 'hostLogin',
    initialState: {
        isHostLoggedIn: false,
        hostNum: null,
        hostName: null,
    },
    reducers: {
        hostLogin: (state, action) => {
            state.isHostLoggedIn = true;
            state.hostNum = action.payload.hostNum;
            state.hostName = action.payload.hostName; // 추가: hostName 업데이트
            // 로그인 성공 시 로컬 스토리지에 로그인 상태 저장
            localStorage.setItem('isHostLoggedIn', true);

        },
        hostLogout: (state) => {
            state.isHostLoggedIn = false;
            state.hostNum = null;
            state.hostName = null;
            // 로그아웃 시 로컬 스토리지에서 로그인 상태 제거
            localStorage.removeItem('isHostLoggedIn');
        },
    },
});

export const { hostLogin, hostLogout } = hostLoginSlice.actions;
export default hostLoginSlice.reducer;


