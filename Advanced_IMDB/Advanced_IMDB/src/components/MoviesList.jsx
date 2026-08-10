import React from "react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../fetchMovies";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useContext } from "react";
import { MovieContext } from "../../src/context/MovieContextWrapper";

const MoviesList = () => {
  //   const [movies, setMovies] = useState(() => {
  //     return JSON.parse(localStorage.getItem("ImdbWatchList")) || [];
  //   });
  const [movies, setMovies] = useState([]);

  const [range, setRange] = useState(0);
  const { addToWatchList, removeFromWatchList, movieWatchList } =
    useContext(MovieContext);

  const handleRight = () => {
    setRange((prev) => {
      return prev + 5 >= movies.length ? 0 : prev + 5;
    });
    console.log("left", range);
  };
  const handleLeft = () => {
    setRange((prev) => {
      const lastRange = Math.floor((movies.length - 1) / 5) * 5;
      return prev - 5 < 0 ? lastRange : prev - 5;
    });
    console.log("right", range);
  };
  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  // Handle like function
  const handleLike = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, liked: !movie.liked } : movie
      )
    );
  };
  return (
    <div>
      <div className="p-5">
        <h1 className="text-gray-800 text-2xl font-semibold text-center">
          Trending Movies
        </h1>

        <div className="relative">
          <div className="flex gap-10 flex-wrap justify-center mt-5">
            {movies.slice(range, range + 5).map((movie, index) => (
              <div
                key={movie.id}
                className="relative h-[30vh] w-[200px] rounded-xl bg-cover bg-center 
        flex items-end overflow-hidden"
                style={{
                  backgroundImage: `url(${movie.bannerImage})`,
                }}
              >
                <div
                  className="w-full text-white text-sm text-center font-medium
          px-3 py-3 bg-gradient-to-t 
          from-black via-black/60 to-transparent"
                >
                  {movie.title}
                </div>
                <Heart
                  size={32}
                  fill={movie.liked ? "red" : "none"}
                  color={movie.liked ? "red" : "white"}
                  className="absolute top-2 right-2 bg-amber-50/50 rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    const updatedMovie = {
                      ...movie,
                      liked: !movie.liked,
                    };

                    handleLike(movie.id);

                    if (updatedMovie.liked) {
                      addToWatchList(updatedMovie);
                    } else {
                      removeFromWatchList(updatedMovie);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2
    bg-black/50 p-2 rounded-full text-white
    hover:cursor-pointer"
            onClick={handleLeft}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2
    bg-black/50 p-2 rounded-full text-white
    hover:cursor-pointer"
            onClick={handleRight}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
