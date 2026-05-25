import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, setInputValue } from "../redux/ToDoSlice";

const ToDoList = () => {
  const { inputValue, todoList } = useSelector((store) => store.toDo);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>ToDoList</h2>
      <input
        type="text"
        placeholder="Enter task details ... "
        value={inputValue}
        onChange={(e) => {
          dispatch(setInputValue(e.target.value));
        }}
        style={{ marginRight: "5px", padding: "10px" }}
      />
      <button onClick={() => dispatch(addTask(inputValue))}>Add Task</button>
      <ul>
        {todoList?.map((task, index) => {
          return (
            <li key={index} style={{ margin: "5px" }}>
              {task}
              <button
                onClick={() => dispatch(removeTask(index))}
                style={{ marginLeft: "10px" }}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
