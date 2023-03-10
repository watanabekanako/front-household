import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
export const formSlice = createSlice({
    name: "authForm",
    initialState: {
        email:"",
        password:""
    },
    reducers: {
addEmail:(state,action)=>{
    state.email=action.payload;
},
addPassword:(state,action)=>{
    state.password=action.payload;
},
    }
})
export const {addEmail,addPassword} =formSlice.actions
export default formSlice.reducer
