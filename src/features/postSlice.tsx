import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    date: "",
    memo: "",
    expence: 0,
    category: 0,
    alert: false,
  },
  reducers: {
    inputDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    inputMemo: (state, action: PayloadAction<string>) => {
      state.memo = action.payload;
    },
    inputPrice: (state, action: PayloadAction<number>) => {
      state.expence = action.payload;
    },
    categoryId: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    alertMsg: (state) => {
      state.alert = !state.alert;
    },
  },
});

export const { inputDate, inputPrice, inputMemo, categoryId, alertMsg } =
  postSlice.actions;
export default postSlice.reducer;
