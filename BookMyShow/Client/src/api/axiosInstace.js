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

export default axiosInstace;