import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    response:"",
    isLoading: false,
    error:''
}

export const registerUser = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI)=>{
        const response = await axios.post('http://localhost:4000/registration', payload).catch(error=>{
            payload.showMessage();
            console.log(error); 
            throw error});
        // console.log(response.data);
        payload.showMessage();
        return response.data;
    }
)

export const registrationSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = "";
                    state.response = action.payload;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    // console.log(action);
                    state.isLoading = false;
                    state.error = action.error&&action.error;
                })
    }
});

export default registrationSlice.reducer;
// export const {usersFetching} = userSlice.actions;
