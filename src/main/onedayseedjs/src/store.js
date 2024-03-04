import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import hostLoginReducer from './slices/hostLoginSlice';

const preloadedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};
export const store = configureStore({
    reducer: {
        login: loginReducer,
        hostLogin: hostLoginReducer,

    },preloadedState,
});
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
export default store;

