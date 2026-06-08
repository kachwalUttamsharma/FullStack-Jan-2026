import React, { useState, useEffect } from "react";

const ToDoListF = () => {
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    console.log("Component did mount called");
    // simulating fetching data from an API
    setTimeout(() => {
      setTodos(["Buy groceries", "Walk the dog", "Read a book"]);
    }, 4000);

    return () => {
        console.log("Component will unmount called");
    }
  }, []);

  useEffect(() => {
    console.log("Component did update called");
    if (newToDo) {
      console.log("New To-Do added:", newToDo);
    }
  }, [newToDo]);

  const handleInputChange = (event) => {
    setNewToDo(event.target.value);
  };
  const handleAddToDo = (event) => {
    setTodos((prev) => [...prev, newToDo]);
    setNewToDo("");
  };

  return (
    <div>
      <h1>My TO-DO List</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={newToDo}
        onChange={handleInputChange}
      />
      <button onClick={handleAddToDo}>Add Task</button>
      <ul>
        {todos?.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoListF;
