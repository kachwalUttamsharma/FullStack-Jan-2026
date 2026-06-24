import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost:4000/api/bookmyshow/v1/"
})

export default axiosInstace;