import { createSlice } from "@reduxjs/toolkit";

// slice == state useState
const counterSlice = createSlice({
  name: "counterSlice",
  initialState: {
    count: 0,
    random: "",
  },
  reducers: {
    increment: (state, random) => {
      state.count += 1;
      state.random = random.payload;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
