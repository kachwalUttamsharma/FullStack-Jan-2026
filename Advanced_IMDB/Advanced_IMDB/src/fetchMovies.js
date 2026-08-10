import axios from "axios";

export const fetchMovies = async (setMovies, limit = null) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?api_key=0fa9d94b072b5c497f3a9720acb86bc2&language=en-US";

    const response = await axios.get(url);

    let movieData = response?.data?.results;

    const watchList = JSON.parse(localStorage.getItem("ImdbWatchList")) || [];

    if (limit) {
      movieData = movieData.slice(0, limit);
    }

    setMovies(
      movieData.map((movie) => ({
        ...movie,
        bannerImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        liked: watchList.some((savedMovie) => savedMovie.id === movie.id),
      })),
    );
  } catch (error) {
    console.log(error);
  }
};
