import axiosInstance from "./axiosInstace.js";

export const getAllTheatre = async () => {
  try {
    const response = await axiosInstance.get("/theatres/getAllTheatres");
    return response?.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
     return error;
  }         
};

export const addTheatre = async (theatreData) => {
  try {
    const response = await axiosInstance.post("/theatres/addTheatre", theatreData);
    return response?.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    return error;
  }
};

export const updateTheatre = async (theatreId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/theatres/updateTheatre/${theatreId}`, updatedData);
    return response?.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    return error;
  }
};

export const deleteTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.delete(`/theatres/deleteTheatre/${theatreId}`);   
        return response?.data;
    } catch (error) {
        console.error("Error deleting movie:", error);
        return error;
    }
};
