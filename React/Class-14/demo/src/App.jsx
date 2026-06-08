import './App.css'
import HelloWorld from './components/HelloWorld'
import ToDoListF from './components/ToDoListF'
import React, { useState }  from 'react';
import WithLoading from './components/HOC/WithLoading';


function App() {
  const [show, setShow] = useState(true);

  const EnhancedComponent = WithLoading(ToDoListF);

  return (
    <>
      {/* <HelloWorld name="Aryan" /> */}
      {/* {show && <ToDoList />} */}
      {show && <EnhancedComponent />}
      <button onClick={() => setShow((prev) => !prev)}>{show ? "Hide" : "Show"} To-Do List</button>
    </>
  )
}

export default App
