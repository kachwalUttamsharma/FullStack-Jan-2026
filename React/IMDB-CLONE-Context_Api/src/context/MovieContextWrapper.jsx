import React, { useState, useEffect } from "react";

export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [watchList, setWatchList] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const storedWatchList = localStorage.getItem("ImdbWatchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  const removeFromWatchList = (movie) => {
    setWatchList((prev) => {
      const filteredList = prev.filter((m) => m?.id !== movie?.id);
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
    // Safeguard to ensure watchList is always an array
    if (!Array.isArray(watchList)) {
      console.error("watchList is not an array or is undefined");
      return false;
    }
    return watchList.find((m) => m?.id === movie?.id) ? true : false;
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
