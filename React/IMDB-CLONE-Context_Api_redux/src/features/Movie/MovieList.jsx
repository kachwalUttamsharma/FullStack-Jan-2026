import React, { useContext, useState } from "react";
import MovieInfo from "./MovieInfo";
import { MovieContext } from "../../context/MovieContextWrapper";

const MovieList = ({ movies, checkIfMoviePresentInWatchList }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { addToWatchList, removeFromWatchList } = useContext(MovieContext);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap items-center">
        {movies?.length >> 0 &&
          movies.map((movie, index) => {
            return (
              <div key={index}>
                <div
                  className="h-[30vh] w-[200px] rounded-xl bg-cover bg-center flex flex-col items-end justify-between"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                  }}
                >
                  {checkIfMoviePresentInWatchList(movie) && (
                    <div
                      className="m-4 flex justify-center h-8 w-8 items-center rounded-xl bg-gray-900/60 hover:cursor-pointer"
                      onClick={() => {
                        removeFromWatchList(movie);
                      }}
                    >
                      &#10060;
                    </div>
                  )}
                  {!checkIfMoviePresentInWatchList(movie) && (
                    <div
                      className="m-4 flex justify-center h-8 w-8 items-center rounded-xl bg-gray-900/60 hover:cursor-pointer"
                      onClick={() => {
                        addToWatchList(movie);
                      }}
                    >
                      &#128525;
                    </div>
                  )}
                  <div
                    className="text-white w-full text-center text-2xl p-4 bg-black/50 hover:cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedMovie(movie);
                    }}
                  >
                    {movie.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {openModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 h-screen z-50 flex justify-center items-center">
          <MovieInfo
            movie={selectedMovie}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default MovieList;
