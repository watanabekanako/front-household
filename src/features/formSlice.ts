import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
export const formSlice = createSlice({
    name: "authForm",
    initialState: {
        email:"",
        password:"",
        error:false
    },
    reducers: {
addEmail:(state,action)=>{
    state.email=action.payload;
},
addPassword:(state,action)=>{
    state.password=action.payload;
}, 
addError:(state,action)=>{
    state.error=action.payload;
}
    }
})
export const {addEmail,addPassword,addError} =formSlice.actions
export default formSlice.reducer
