import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
    baseURL: apiEndpoint
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        api.defaults.headers.common["Content-Type"] = "application/json"
    } else {
        delete api.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["Content-Type"];
    }
}

export default api;