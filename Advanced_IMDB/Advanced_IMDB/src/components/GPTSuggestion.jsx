import React, { useState, useEffect } from "react";
import { getMovieRecommendations } from "../helper/getMovieRecommendations";
import { fetchMovies } from "../fetchMovies";

const GPTSuggestion = () => {
  const [movies, setMovies] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({
    recommendations: [],
  });

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  const handleSearchPrompt = async () => {
    try {
      setLoading(true);

      const data = await getMovieRecommendations(movies, prompt);

      setResponse(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <h1 className="text-center mt-5 text-3xl font-semibold text-gray-800">
        ✨ Discover Movies with AI
      </h1>

      <p className="text-center mt-2 text-gray-500">
        Describe your mood, genre, actors, or story ideas and get personalized
        recommendations instantly.
      </p>

      <div className="flex justify-center gap-3 items-center mt-8">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-[60%] p-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Suggest underrated thriller movies from the 2000s"
        />

        <button
          disabled={loading}
          onClick={handleSearchPrompt}
          className="px-6 py-4 bg-yellow-400 rounded-lg cursor-pointer hover:bg-yellow-500 disabled:bg-gray-300"
        >
          {loading ? "Generating..." : "Search"}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {response.recommendations.map((movie) => (
          <div
            key={movie.title}
            className="w-[320px] bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl text-gray-800">
                🎬 {movie.title}
              </h2>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                {movie.confidence}%
              </span>
            </div>

            <div className="mt-4">
              <p className="text-gray-500 text-sm leading-6">{movie.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {!loading && response.recommendations.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No recommendations found 🎬
        </p>
      )}
    </div>
  );
};

export default GPTSuggestion;
