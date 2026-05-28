import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

axiosInstance.interceptors.request.use(function (config) {
    const accesToken = localStorage.getItem("token");
    if (accesToken) {
        config.headers.Authorization = `Bearer ${accesToken}`
    }
    return config;
}, function (err) {
    return Promise.reject(err)
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response) {

            if (err.response.status === 500) {
                console.error("Server error .Please try again later")
            }
        }
        else if (err.code === "ECONNABORTED") {               //"The connection was aborted by the software."
            console.error("Please try again ")
        }

        return Promise.reject(err)
    }
)

export default axiosInstance