import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../redux/loginSlice'
import eventReducer from './eventSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
    event: eventReducer
  },
})