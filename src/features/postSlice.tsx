import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    date: "",
    memo: "",
    expence: 0,
    category: 0,
  },
  reducers: {
    inputDate: (state, action) => {
      state.date = action.payload;
    },
    inputMemo: (state, action) => {
      state.memo = action.payload;
    },
    inputPrice: (state, action) => {
      state.expence = action.payload;
    },
    categoryId: (state, action) => {
      state.category = action.payload;
    },
    resetPost: (state, action) => {
      action.payload = state.memo;
      action.payload = state.expence;
    },
  },
});

export const { inputDate, inputPrice, inputMemo, categoryId, resetPost } =
  postSlice.actions;
export default postSlice.reducer;
