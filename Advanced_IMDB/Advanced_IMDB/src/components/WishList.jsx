import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const WishList = () => {
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("ImdbWatchList")) || [];
  });
  const [asec, setAsec] = useState(false);
  const handleRemove = (movieId) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.filter((movie) => movie.id !== movieId);
      localStorage.setItem("ImdbWatchList", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };
  const handleSorting = () => {
    setAsec((prev) => {
      const newValue = !prev;
      const sortedMovies = [...movies].sort((A, B) => {
        return newValue
          ? A.vote_average - B.vote_average
          : B.vote_average - A.vote_average;
      });
      setMovies(sortedMovies);
      return newValue;
    });
  };
  const [search, setSearch] = useState("");
  const filteredMovies = movies.filter((movie) =>
    movie?.title.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">My Watchlist</h2>

          <input
            type="text"
            placeholder="Search movie..."
            className="px-4 py-2 w-64 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-sm text-slate-500 bg-slate-50">
              <th className="px-8 py-4 text-left font-medium">Movie</th>

              <th
                className="px-8 py-4 text-left font-medium flex hover:cursor-pointer "
                onClick={handleSorting}
              >
                Rating{"   "}
                {asec === true ? (
                  <ArrowUp size={20} strokeWidth={2} />
                ) : (
                  <ArrowDown size={20} strokeWidth={2} />
                )}
              </th>
              <th className="px-8 py-4 text-left font-medium">Votes</th>
              <th className="px-8 py-4 text-left font-medium">Popularity</th>
              <th className="px-8 py-4 text-left font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-500">
                  No movies added to watchlist 🎬
                </td>
              </tr>
            ) : filteredMovies.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-500">
                  No movies found 🎬
                </td>
              </tr>
            ) : (
              filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition duration-300"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={movie.bannerImage}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-semibold text-slate-800">
                          {movie.title}
                        </p>

                        <p className="text-sm text-slate-500">
                          {movie.release_date} • {movie.media_type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-amber-500 font-semibold">
                    ★ {movie.vote_average}
                  </td>

                  <td className="px-8 py-5 text-slate-600">
                    {movie.vote_count}
                  </td>

                  <td className="px-8 py-5 text-slate-600">
                    {movie.popularity}
                  </td>

                  <td className="px-8 py-5">
                    <button
                      className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg"
                      onClick={() => handleRemove(movie.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
