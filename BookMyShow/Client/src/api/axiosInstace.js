import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost:3000/bookmyshow/api/v1/",
    timeout: 5000
})

// incerceptors
axiosInstace.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("bookmyshow_token");
        if(token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
)

axiosInstace.interceptors.response.use(
    (response) => {
        if(response && response.data && !response.data.success && response.data.message === "Token has expired, Login again to continue") { 
            localStorage.removeItem("bookmyshow_token");
            window.location.href = "/login";
        }
        return response;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
)

export default axiosInstace;