import type { User } from "@/types";
/* eslint-disable react-refresh/only-export-components */
import React , { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRoute } from "@/lib";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: { token: string; user: User }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({children} : { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const currentPath = useLocation().pathname;
    const isPublicRoute = publicRoute.includes(currentPath);

    // check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);

            const userInfo = localStorage.getItem("user");

            if (userInfo) {
                try {
                    setUser(JSON.parse(userInfo));
                    setIsAuthenticated(true);
                } catch {
                    // localStorage might contain a corrupted value (e.g. "undefined")
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                    setIsAuthenticated(false);

                    if (!isPublicRoute) {
                        navigate("/auth/login");
                    }
                }
            } else {
                setIsAuthenticated(false);
                if (!isPublicRoute) {
                    navigate("/auth/login")
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    

    // login
    const login = async (data: { token: string; user: User }) => {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
    };

    // logout
    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);

        // to remove cache and react-query
        queryClient.clear();
        navigate("/auth/login");
    };

    useEffect(() => {
        const handleLogout = () => {
            void logout();
        };

        window.addEventListener("force-logout", handleLogout);
        return () => window.removeEventListener("force-logout", handleLogout);
    },[]);

    const values = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error ("useAuth must be used within an AuthProvider");
    }
    return context
} 

export { AuthProvider }


