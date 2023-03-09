import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    price: 0,
  },
  reducers: {
    addPost: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
