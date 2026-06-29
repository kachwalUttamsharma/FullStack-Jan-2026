import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost:3000/bookmyshow/api/v1/",
    timeout: 5000
})

export default axiosInstace;