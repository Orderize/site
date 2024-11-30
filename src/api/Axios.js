import axios from "axios";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
    baseURL: apiEndpoint
});

export default api;