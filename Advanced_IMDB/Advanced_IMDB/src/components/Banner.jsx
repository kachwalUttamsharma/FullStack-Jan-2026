import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchMovies } from "../fetchMovies";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleRight = () => {
    setCurrentIndex((prev) => {
      return prev === movies.length - 1 ? 0 : prev + 1;
    });
  };
  const handleLeft = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? movies.length - 1 : prev - 1;
    });
  };
  useEffect(() => {
    fetchMovies(setMovies, 5);
  }, []);
  // Auto slide every 3 seconds
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div>
      {movies?.length > 0 && (
        <div className="relative h-[90vh]">
          <div
            className="h-full bg-cover bg-center flex items-end"
            style={{
              backgroundImage: `url(${movies[currentIndex]?.bannerImage})`,
            }}
          >
            <div
              className="text-white w-full h-40 text-center text-2xl
                px-4 bg-gradient-to-t from-black via-black/60 to-transparent
                flex items-end justify-center pb-6"
            >
              {movies[currentIndex]?.title}
            </div>
          </div>
          <button
            className="absolute top-1/2 left-3 bg-black/50 p-2 rounded-full text-white hover:cursor-pointer"
            onClick={handleLeft}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-3 bg-black/50 p-2 rounded-full text-white hover:cursor-pointer"
            onClick={handleRight}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
