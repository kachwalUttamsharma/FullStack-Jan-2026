import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import paginationReducer from "./paginationSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    pagination: paginationReducer,
  },
});

export default store;
