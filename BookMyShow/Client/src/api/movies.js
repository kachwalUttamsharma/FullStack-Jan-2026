import axiosInstance from "./axiosInstace.js";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/getAllMovies");
    return response?.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
     return error;
  }         
};

export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post("/movies/addMovie", movieData);
    return response?.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    return error;
  }
};

export const updateMovie = async (movieId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/movies/updateMovie/${movieId}`, updatedData);
    return response?.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    return error;
  }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`/movies/deleteMovie/${movieId}`);   
        return response?.data;
    } catch (error) {
        console.error("Error deleting movie:", error);
        return error;
    }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movies/getMovieById/${movieId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return error;
  }
};