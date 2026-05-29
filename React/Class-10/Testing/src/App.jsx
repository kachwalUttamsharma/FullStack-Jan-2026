import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import Login from "./components/Login";
import Product from "./components/Product";

function App() {
  return (
    <>
      <HelloWorld />
      <Counter />
      <Login />
      <Product />
    </>
  );
}

export default App;
