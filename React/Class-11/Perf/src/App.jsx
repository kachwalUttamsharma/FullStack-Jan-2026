import { useEffect, useState, lazy, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import NavBar from "../Components/NavBar";
import LargeArraySum from "../Components/useMemo/LargeArraySum";
import ItemList from "../Components/useCallback/ItemList";

function App() {
  return (
    <>
      {/* <LargeArraySum /> */}
      <ItemList />
    </>
  );
}

export default App;
