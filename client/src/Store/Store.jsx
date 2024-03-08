import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slice/UserSlice'

const Store = configureStore({
    reducer: {
        user: UserSlice
    }
})

export default Store
