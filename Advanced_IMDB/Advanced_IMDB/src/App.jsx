import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import WishList from "./components/WishList";
import Header from "./components/Header";
import GPTSuggestion from "./components/GPTSuggestion";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/GPTsearch" element={<GPTSuggestion />} />
      </Routes>
    </>
  );
}

export default App;
