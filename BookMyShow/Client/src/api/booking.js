import axiosInstance from "./axiosInstace.js";


export const makePayment = async ({ amount, description, userId, name }) => {
  try {
    const response = await axiosInstance.post("/bookings/makePayment", {
      amount,
      description,
      userId,
      name
    });
    console.log(response);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/bookings/bookShow", payload);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings/getAllBookings");
    return response.data;
  } catch (err) {
    return err.response;
  }
};
