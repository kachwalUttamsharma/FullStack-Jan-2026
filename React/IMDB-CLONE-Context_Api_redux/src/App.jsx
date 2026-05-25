import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./features/Banner/NavBar";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
import PageNotFound from "./Components/PageNotFound";
import MovieContextWrapper from "./context/MovieContextWrapper";
import LoaderContextWrapper from "./context/LoaderContextWrapper";

function App() {
  return (
    <>
      <LoaderContextWrapper>
        <MovieContextWrapper>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MovieContextWrapper>
      </LoaderContextWrapper>
    </>
  );
}

export default App;
