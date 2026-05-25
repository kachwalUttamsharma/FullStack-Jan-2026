import axios from "axios";
import { Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
import { LoaderContext } from "../../context/LoaderContextWrapper";

const MovieInfo = ({ movie, handleCloseModal }) => {
  const { id, title, poster_path, release_date, overview, vote_average } =
    movie;
  const { loader, setLoader } = useContext(LoaderContext);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0fa9d94b072b5c497f3a9720acb86bc2`,
        );
        const trailerObj = response?.data?.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        if (trailerObj) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchTrailer();
  });
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-[45vw] max-h[90vh]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row gap-6">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={`${title} poster`}
                className="w-[33%] rounded-xl object-cover"
              />
            ) : (
              <div>No Image is Available</div>
            )}
            <div>
              <h2 className="text-3xl font-bold text-blue-500">{title}</h2>
              <p className="text-gray-500 font-bold">
                Release Date : {release_date}
              </p>
              <p className="text-gray-500 font-bold">
                Average Vote: {vote_average}
              </p>
              <p className="text-gray-700">
                {overview ? overview : "No Overview Available"}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">
              Trailer
            </h3>
            <div className="w-full h-60">
              {trailerUrl ? (
                <iframe
                  src={trailerUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              ) : (
                <p className="text-gray-500 text-center">
                  Trailer Not Available
                </p>
              )}
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default MovieInfo;
