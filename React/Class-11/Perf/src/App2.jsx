import { useEffect, useState, lazy, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import NavBar from "../Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "../Components/HomePage";
// import AboutPage from "../Components/AboutPage";
// import ContactPage from "../Components/ContactPage";

function App2() {
  const HomeComponentPage = lazy(() => import("../Components/HomePage"));
  const AboutPage = lazy(() => import("../Components/AboutPage"));
  const ContactPage = lazy(() => import("../Components/ContactPage"));
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>...Loading</div>}>
          <Routes>
            <Route path="/" element={<HomeComponentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App2;
