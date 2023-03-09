import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import{FormsData} from "../DummyData"
export const formSlice = createSlice({
    name: "form",
    initialState: {value:FormsData},
    reducers: {
addForm:(state,action)=>{
    state.value.push(action.payload)
}
    }
})


export default formSlice.reducer
