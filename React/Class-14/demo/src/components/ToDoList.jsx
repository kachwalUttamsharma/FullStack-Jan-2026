import React, { Component } from "react";

class ToDoList extends Component {

  constructor(props) {
    console.log("Constructor called");
    super(props);
    this.state = {
      todos: [],
      newToDo: ""
    }
  }

 // useEffect with empty dependency array 
  componentDidMount() {
    console.log("Component did mount called");
    // simulating fetching data from an API
    setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        todos: ["Buy groceries", "Walk the dog", "Read a book"]
      }))
    }, 4000)
  }


  // useEffect with dependency array
  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update called");
    if (prevState.newToDo !== this.state.newToDo) {
      console.log("New To-Do added:", this.state.newToDo);
    }
  }

  // useEffect with cleanup function
  componentWillUnmount() {
    console.log("Component will unmount called");
    // cleanup code here (e.g., clearing timers, canceling API requests)
  }

  handleInputChange = (event) => {
    this.setState((prev) => ({
      ...prev,
      newToDo: event.target.value
    }))
  }

  handleAddToDo = (event) => {
    this.setState((prev) => ({
      todos: [...prev.todos, prev.newToDo],
      newToDo: ""
    }))
  }
    
  render() {
    return (
      <div>
        <h1>My TO-DO List</h1>
        <input type="text" placeholder="Enter a task" value={this.state.newToDo} onChange={this.handleInputChange}/>
        <button onClick={this.handleAddToDo}>Add Task</button>
        <ul>
          {this?.state?.todos?.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
