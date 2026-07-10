import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("access_token") || null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const login = (accessToken) => {
        localStorage.setItem("access_token", accessToken);
        setToken(accessToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");

        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;