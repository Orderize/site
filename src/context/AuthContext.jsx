import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/Auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    // const navigate = useNavigate();

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", userData);
    };
    
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        // navigate("/login")
    }

    const handleAuth = async () => {
        const storedToken = localStorage.getItem("token");
        
        if (storedToken) {
            try {
                const response = await authApi(); 
                setUser(response.data.user);
                setToken(response.data.token);
            } catch {
                setUser(null);
                setToken(null);
            }
        }
    };

    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
