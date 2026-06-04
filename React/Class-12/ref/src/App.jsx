import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import RefExample from "./components/RefExample";
import Timer from "./components/Timer";

function App() {
  return (
    <>
      <RefExample />
      <Timer />
      <Timer />
    </>
  );
}

export default App;
