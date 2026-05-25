import React, { useContext, useEffect, useState } from "react";
import genreids from "../../helpers/GenreIds";
import { ArrowDown, ArrowUp } from "lucide-react";
import MovieRecommendations from "./MovieRecommendations";
import { MovieContext } from "../../context/MovieContextWrapper";

const WatchListTable = () => {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] = useState("All Genre");
  const [showModel, setShowModel] = useState(false);
  const { watchList, setWatchList, removeFromWatchList } =
    useContext(MovieContext);

  useEffect(() => {
    setGenreList(() => [
      "All Genre",
      ...new Set(watchList?.map((movie) => genreids[movie?.genre_ids[0]])),
    ]);
  }, [watchList]);

  const handleAscendingOrderRatings = () => {
    const sortedData = watchList?.sort(
      (A, B) => B?.vote_average - A?.vote_average,
    );
    setWatchList([...sortedData]);
  };
  const handlDesendingOrderRatings = () => {
    const sortedData = watchList?.sort(
      (A, B) => A?.vote_average - B?.vote_average,
    );
    setWatchList([...sortedData]);
  };

  return (
    <>
      <button
        className="flex justify-center items-center bg-blue-400 hover:bg-blue-500 transition duration-300 h-[3rem] w-[14rem] text-white font-bold border border-blue-700 rounded-xl shadow-md cursor-pointer mx-[43%] my-4"
        onClick={() => {
          setShowModel((prev) => !prev);
        }}
      >
        Recommed Movies
      </button>
      {showModel && <MovieRecommendations watchList={watchList} />}
      <div className="flex justify-center m-4">
        {genreList.length > 0 &&
          genreList?.map((genre, index) => {
            return (
              <div
                key={index}
                className={`m-4 flex justify-center items-center h-[3rem] w-[9rem] font-bold rounded-xl cursor-pointer ${currGenre === genre ? "bg-blue-400 text-white" : "bg-gray-300"}`}
                onClick={() => setCurrGenre(genre)}
              >
                {genre}
              </div>
            );
          })}
      </div>
      <div className="flex justify-center m-4">
        <input
          type="text"
          placeholder="Search By Movie Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-[3rem] w-[18rem] px-4 outline-none border border-slate-700 rounded-lg bg-gray-300"
        />
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-6 px-4 font-medium text-gray-900 w-[30%]">
              Name
            </th>
            <th className="py-6 px-4 font-medium text-gray-900">
              <div className="flex gap-3">
                <ArrowUp
                  size={24}
                  strokeWidth={2}
                  onClick={handleAscendingOrderRatings}
                  className="hover:cursor-pointer"
                />
                Ratings
                <ArrowDown
                  size={24}
                  strokeWidth={2}
                  onClick={handlDesendingOrderRatings}
                  className="hover:cursor-pointer"
                />
              </div>
            </th>
            <th className="py-6 px-4 font-medium text-gray-900">Popularity</th>
            <th className="py-6 px-4 font-medium text-gray-900">Genre</th>
            <th className="py-6 px-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {watchList?.length > 0 &&
            watchList
              .filter((movie) => {
                return movie?.title
                  .toLowerCase()
                  .trim()
                  .includes(search.toLowerCase().trim());
              })
              .map((movie, index) => {
                return (
                  <tr key={index}>
                    <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt="Movie Poster"
                        className="h-[6rem] w-[8rem] object-cover"
                      />
                      <div className="font-medium text-gray-700 text-sm pl-10">
                        {movie?.title}
                      </div>
                    </td>
                    <td className="pl-6 py-4">{movie?.vote_average}</td>
                    <td className="pl-6 py-4">{movie?.popularity}</td>
                    <td className="pl-6 py-4">
                      {genreids[movie?.genre_ids[0]]}
                    </td>
                    <td className="pl-6 py-4 ">
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeFromWatchList(movie)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
};

export default WatchListTable;
