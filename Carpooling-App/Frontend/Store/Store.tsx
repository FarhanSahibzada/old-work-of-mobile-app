import { configureStore } from "@reduxjs/toolkit";
import UserAuthSlice from './UserAuthSlice'

const store =  configureStore({
    reducer : {
        userAuth : UserAuthSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;


export default store;