import React, { useState, useEffect } from "react";

export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [watchList, setWatchList] = useState();

  useEffect(() => {
    setWatchList(() => {
      if (localStorage.getItem("ImdbWatchList")) {
        return JSON.parse(localStorage.getItem("ImdbWatchList"));
      }
    });
  }, []);

  const removeFromWatchList = (movie) => {
    setWatchList((prev) => {
      const filteredList = prev.filter((m) => m?.id != movie?.id);
      localStorage.setItem("ImdbWatchList", JSON.stringify(filteredList));
      return filteredList;
    });
  };

  const addToWatchList = (movie) => {
    setWatchList((prev) => {
      const updatedList = [...prev, movie];
      localStorage.setItem("ImdbWatchList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const checkIfMoviePresentInWatchList = (movie) => {
    return watchList?.find((m) => m?.id === movie?.id) ? true : false;
  };
  return (
    <MovieContext.Provider
      value={{
        watchList,
        setWatchList,
        removeFromWatchList,
        addToWatchList,
        checkIfMoviePresentInWatchList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextWrapper;
