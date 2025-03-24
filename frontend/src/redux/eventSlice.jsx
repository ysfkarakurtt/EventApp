import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    is_join: 0,
    is_remove: JSON.parse(localStorage.getItem('is_remove')) || [],
    dates: [],
    times: [],
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setJoin: (state, action) => {
            state.is_join = action.payload;
            localStorage.setItem('is_join', JSON.stringify(action.payload));
        },
        setRemove: (state, action) => {
            state.is_remove.push(action.payload); localStorage.setItem('is_remove', JSON.stringify(state.is_remove));
        },
        setUpdatedRemove: (state, action) => {
            state.is_remove = action.payload;
            localStorage.setItem('is_remove', JSON.stringify(state.is_remove));
        },
        resetRemove: (state) => { state.is_remove = []; localStorage.setItem('is_remove', JSON.stringify([])); },
        setDate: (state, action) => {
            state.dates.push(action.payload);
            localStorage.setItem('dates', JSON.stringify(state.dates));
        },
        setTime: (state, action) => {
            state.times.push(action.payload);
            localStorage.setItem('times', JSON.stringify(state.times));
        }

    },
});

export const { setJoin, setDate, setTime, setRemove, resetRemove, setUpdatedRemove } = eventSlice.actions;
export default eventSlice.reducer;
