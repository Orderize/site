// api/Axios.js
import axios from "axios";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
    baseURL: apiEndpoint
});

// Interceptor de requisição
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // ou use algum método para obter o token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

export default api;