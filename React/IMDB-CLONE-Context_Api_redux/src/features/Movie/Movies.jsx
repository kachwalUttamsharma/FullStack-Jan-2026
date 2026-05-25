import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import Pagination from "../../Components/Pagination";
import MovieList from "./MovieList";
import { MovieContext } from "../../context/MovieContextWrapper";
import { LoaderContext } from "../../context/LoaderContextWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingMovies } from "../../redux/movieSlice";
import { handleNext, handlePrevious } from "../../redux/paginationSlice";

const Movies = () => {
  const { watchList, checkIfMoviePresentInWatchList } =
    useContext(MovieContext);
  const { movies, loading, error } = useSelector((state) => state.movie);
  const { pageNo } = useSelector((state) => state.pagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies(pageNo));
  }, [pageNo]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="text-2xl font-bold text-center m-5">
            Trending Movies
          </div>
          <MovieList
            movies={movies}
            checkIfMoviePresentInWatchList={checkIfMoviePresentInWatchList}
          />
          <Pagination
            pageNo={pageNo}
            handleNext={() => dispatch(handleNext())}
            handlePrev={() => dispatch(handlePrevious())}
          />
        </div>
      )}
    </>
  );
};

export default Movies;
