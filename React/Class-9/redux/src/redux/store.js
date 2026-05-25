import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./CounterSlice";
import TodoSlice from "./ToDoSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    toDo: TodoSlice,
    user: UserSlice,
  },
});

export default store;
