
import axios from "axios";
import { toast } from "sonner";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
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
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      toast.error("Session expired! Please login again.");
      window.location.href = "/";
    }

    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);
