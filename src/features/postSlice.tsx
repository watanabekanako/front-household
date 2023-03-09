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
  },
});

export const { inputDate, inputPrice, inputMemo, categoryId } =
  postSlice.actions;
export default postSlice.reducer;
