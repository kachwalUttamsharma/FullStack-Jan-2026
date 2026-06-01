import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./features/Banner/NavBar";
// import Home from "./Pages/Home";
// import WatchList from "./Pages/WatchList";
// import PageNotFound from "./Components/PageNotFound";
import MovieContextWrapper from "./context/MovieContextWrapper";
import LoaderContextWrapper from "./context/LoaderContextWrapper";
import { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner";

function App() {
  const HomePage = lazy(() => import("./Pages/Home"));
  const WatchListPage = lazy(() => import("./Pages/WatchList"));
  const PageNotFoundPage = lazy(() => import("./Components/PageNotFound"));
  return (
    <>
      <LoaderContextWrapper>
        <MovieContextWrapper>
          <NavBar />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/watchlist" element={<WatchListPage />} />
              <Route path="*" element={<PageNotFoundPage />} />
            </Routes>
          </Suspense>
        </MovieContextWrapper>
      </LoaderContextWrapper>
    </>
  );
}

export default App;
