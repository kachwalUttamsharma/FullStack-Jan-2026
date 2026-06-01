import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App1.css";
import NavBar from "../Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-route¯r-dom";
// import HomePage from "../Components/HomePage";
// import AboutPage from "../Components/AboutPage";
// import ContactPage from "../Components/ContactPage";

function App1() {
  const [HomePage, setHomePage] = useState(null);
  const [AboutPage, setAboutPage] = useState(null);
  const [ContactPage, setContactPage] = useState(null);

  useEffect(() => {
    loadHomePage();
  }, []);
  const loadHomePage = () => {
    import("../Components/HomePage").then((module) => {
      setHomePage(() => module.default);
    });
  };
  const loadAboutPage = () => {
    import("../Components/AboutPage").then((module) => {
      setAboutPage(() => module.default);
    });
  };
  const loadContactPage = () => {
    import("../Components/ContactPage").then((module) => {
      setContactPage(() => module.default);
    });
  };
  return (
    <>
      <BrowserRouter>
        <NavBar
          loadAboutPage={loadAboutPage}
          loadContactPage={loadContactPage}
          loadHomePage={loadHomePage}
        />
        <Routes>
          <Route
            path="/"
            element={HomePage ? <HomePage /> : <div>Loading ...</div>}
          />
          <Route
            path="/about"
            element={AboutPage ? <AboutPage /> : <div>Loading ...</div>}
          />
          <Route
            path="/contact"
            element={ContactPage ? <ContactPage /> : <div>LoadingPage ...</div>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App1;
