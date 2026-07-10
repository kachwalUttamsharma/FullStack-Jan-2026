import axiosInstance from "./axiosInstace.js";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/addShow", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.patch(`/shows/updateShow/${payload.showId}`, payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.delete(
      `/shows/deleteShow/${payload.showId}`
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `shows/getAllShowsByTheatre/${payload.theatreId}`
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTheatresAndShowsByMovie = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `shows/getAllTheatresAndShowsByMovie/${payload.movie}?date=${payload.date}`,
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `shows/getShowById/${payload.showId}`
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
