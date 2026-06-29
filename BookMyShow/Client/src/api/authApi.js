import axiosInstace from "./axiosInstace";

export async function registerUser(data) {
  try {
    const response = await axiosInstace.post("/users/register", data);
    if (response.status === 201) {
      return response?.data;
    } else if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
}

export async function loginUser(data) {
  try {
    const response = await axiosInstace.post("/users/login", data);
    return response?.data;
  } catch (error) {
    return error;
  }
}

export const currentUser = async (data) => {
  try {
    const response = await axiosInstace.get(`/users/getCurrentUser/${data}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};
