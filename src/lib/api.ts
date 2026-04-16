// src/lib/api.ts
import axios from "axios";



export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ SAFE WAY (important)
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);
