import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reducer'

export const store = configureStore({
    reducer: bookingReducer
})