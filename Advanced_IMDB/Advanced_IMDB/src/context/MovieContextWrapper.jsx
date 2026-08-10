import React, { useState } from "react";

export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [movieWatchList, setMovieWatchList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToWatchList = (movie) => {
    setMovieWatchList((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      if (exists) return prev;

      const updatedList = [...prev, movie];

      localStorage.setItem("ImdbWatchList", JSON.stringify(updatedList));

      return updatedList;
    });
  };

  const removeFromWatchList = (movie) => {
    setMovieWatchList((prev) => {
      const filteredList = prev.filter((m) => m.id !== movie.id);
      localStorage.setItem("ImdbWatchList", JSON.stringify(filteredList));
      return filteredList;
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        movieWatchList,
        addToWatchList,
        removeFromWatchList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextWrapper;
