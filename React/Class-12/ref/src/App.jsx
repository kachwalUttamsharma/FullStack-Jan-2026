import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import RefExample from "./components/RefExample";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import Carousel from "./components/Carousel";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import useVisibility from "./customHook/useVisibility";

function App() {
  const { isVisible, toggle, hide } = useVisibility();
  return (
    <>
      {/* <RefExample />
      <Timer />
      <Timer /> */}
      {/* <Stopwatch /> */}
      <Carousel />
      <UserList />
      {isVisible && <Modal hide={hide} />}
      <button onClick={toggle}>
        {isVisible ? "Hide Modal" : "Show Modal"}
      </button>
    </>
  );
}

export default App;
