import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
});

http.interceptors.request.use((config) => {
    const role = localStorage.getItem("role") || "USER";
    config.headers["X-Role"] = role;
    return config;
});
