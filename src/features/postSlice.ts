import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    date: "",
    memo: "",
    price: 0,
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
      state.price = action.payload;
    },
    categoryId: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { inputDate, inputPrice, inputMemo, categoryId } =
  postSlice.actions;
export default postSlice.reducer;
