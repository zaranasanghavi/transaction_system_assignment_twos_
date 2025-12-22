import axios from "axios";
import { isTokenExpired } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (!token || isTokenExpired(token)) {
    window.location.href = "/";
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
