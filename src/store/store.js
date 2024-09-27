import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./reducers/accountSlice";
import registrationSlice from "./reducers/registrationSlice";



const rootReducer = combineReducers({
    accountSlice:accountSlice,
    registrationSlice:registrationSlice
})

export const store = configureStore({
    reducer:rootReducer 
})