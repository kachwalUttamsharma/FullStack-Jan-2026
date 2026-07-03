import Movie from "../models/Movie.js";

export const addMovie = async (req, res) => {
  try {
    const { title, description, poster, duration, language, genre, date } =
      req?.body;
    // to validate
    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
      return res.status(200).json({
        success: false,
        message: `Movie already exists ${title}`,
      });
    }

    const movie = await Movie.create({
      title,
      description,
      poster,
      duration,
      language,
      genre,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Movie added Successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Adding movie failed with error ${error}`,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All movies fetched Successfully",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fetching all movies failed with error ${error}`,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = req?.params?.id;
    const movie = await Movie.findByIdAndUpdate(movieId, req?.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id ${movieId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie updated Successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Updating movie failed with error ${error}`,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieId = req?.params?.id;
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id ${movieId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted Successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Deleting movie failed with error ${error}`,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movieId = req?.params?.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Movie not found with id ${movieId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie fetched Successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Get Movie By Id Failed with error :  ${error}`,
    });
  }
};
