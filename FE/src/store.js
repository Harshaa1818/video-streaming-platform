import { configureStore } from '@reduxjs/toolkit'
import primarySlice from './slices/primary.slice'

export const  store = configureStore({
    reducer: {
        primary: primarySlice,
    },
})