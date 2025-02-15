import { createSlice , PayloadAction } from "@reduxjs/toolkit";


export interface formdata {
    name : string,
    address : string,
    role : string,
    email : string,
    profileimage? : string,
    phoneNumber : number
}



interface initstatetype  {
    userLogin : formdata | null,
    authStatus : boolean
}

const initialState : initstatetype = {
    userLogin : null , 
    authStatus : false,
}

const userSlice = createSlice({
    name : 'userauth',
    initialState,
reducers : {
    userLogin : (state,action : PayloadAction<formdata>) =>{
        state.userLogin = action.payload;
        state.authStatus = true
    },
    userLogout : (state )=>{
        state.authStatus = false,
        state.userLogin = null
    }
}
})

export const { userLogin , userLogout} = userSlice.actions

export default userSlice.reducer;

