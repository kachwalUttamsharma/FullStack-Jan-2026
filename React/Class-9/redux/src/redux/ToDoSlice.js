import { createSlice } from "@reduxjs/toolkit";

const ToDoSlice = createSlice({
  // name, intial state, reducers
  name: "ToDoSlice",
  initialState: {
    // user might entering something -> user input form
    // end up like a task
    inputValue: "",
    todoList: [],
  },
  reducers: {
    setInputValue: (state, data) => {
      state.inputValue = data.payload;
    },
    addTask: (state, data) => {
      state.todoList.push(data.payload);
      state.inputValue = "";
    },
    removeTask: (state, data) => {
      // filtering based on index
      state.todoList = state.todoList.filter(
        (task, index) => index != data.payload,
      );
    },
  },
});

console.log(ToDoSlice);

export const { setInputValue, addTask, removeTask } = ToDoSlice.actions;

export default ToDoSlice.reducer;
