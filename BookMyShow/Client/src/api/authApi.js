import axiosInstace from "./axiosInstace";

// http://localhost:4000/api/bookmyshow/v1/user/login
export function registerUser(data) {
    // Http Method -> POST -> we are sending user data
    // user
    return axiosInstace.post("/users/register", data);
}

export function loginUser(data) {
    return axiosInstace.post("/users/login", data);
}