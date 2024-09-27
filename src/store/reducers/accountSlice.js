import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "../../tools/cookieManagementTools";

const initialState = {
    accountData:{},
    sessionToken:"",
    isLoading: false,
    isLoaded: false,
    error:''
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI)=>{
        const response = await axios.post('http://localhost:4000/login', payload).
        catch(error=>{
            payload.showError();
        });
        if(response.data)payload.navigateToMain();
        return response.data;
    }
)

export const accountSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout(state){
            setCookie("sessionCookie", "", 0);
            state.isLoading = false;
            state.isLoaded = false;
            state.error = "";
            state.accountData = {};
            state.sessionToken = "";
        },
        initialLogin(state){
            let sessioncookie = getCookie("sessionCookie");
            let userId = getCookie("userId");
            let login = getCookie("login");
            if(sessioncookie){
                state.isLoading = false;
                state.isLoaded = true;
                state.sessionToken = sessioncookie;
                state.accountData = {
                    userId: userId,
                    login: login,
                    role: "USER",
                    token:sessioncookie
                    } 
                }
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state, action) => {
                    state.isLoading = true;
                    state.isLoaded = false;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    setCookie("sessionCookie", action.payload.token, 30);
                    setCookie("userId", action.payload.userId, 30);
                    setCookie("login", action.payload.login, 30);
                    state.isLoading = false;
                    state.isLoaded = true;
                    state.error = "";
                    state.accountData = action.payload;
                    state.sessionToken = action.payload.token;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    // console.log(action);
                    state.isLoaded = false;
                    state.isLoading = false;
                    state.error = action.error&&action.error;
                    state.sessionToken = "";
                    state.accountData = {};
                })
    }
});

export default accountSlice.reducer;
export const {logout,initialLogin} = accountSlice.actions;
