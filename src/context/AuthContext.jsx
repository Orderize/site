import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/Auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);   

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null
    });

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
    };
    
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // navigate("/login")
    }


    useEffect(() => {
    });

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}
