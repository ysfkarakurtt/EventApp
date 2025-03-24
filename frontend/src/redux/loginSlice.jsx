import { createSlice } from '@reduxjs/toolkit'

const savedLoginID = localStorage.getItem('login_id')
    ? JSON.parse(localStorage.getItem('login_id'))
    : 0;

const flag = localStorage.getItem('my_events') ? JSON.parse(localStorage.getItem('my_events')) : false;
const initialState = {
    login_id: savedLoginID, 
    my_events: flag,
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginID: (state, id) => {
            state.login_id = id; 
            localStorage.setItem('login_id', JSON.stringify(id));
        },

        setMyEvents: (state, flag) => {
            state.my_events = flag;
            localStorage.setItem('my_events', JSON.stringify(flag));
        }
    },
})

export const { setLoginID, setMyEvents } = loginSlice.actions
export default loginSlice.reducer
