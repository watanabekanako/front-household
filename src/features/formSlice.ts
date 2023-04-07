import React from "react";
import { createSlice } from "@reduxjs/toolkit";
export const formSlice = createSlice({
  name: "authForm",
  initialState: {
    email: "",
    password: "",
    name: "",
    error: false,
    confirmPassword: "",
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    addConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { addEmail, addPassword, addConfirmPassword, addName } =
  formSlice.actions;
export default formSlice.reducer;
