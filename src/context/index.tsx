import React, { createContext, useContext, useState, useEffect } from 'react';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    email: string;
    fullname: string;
    roles: Role[];
}

interface AppContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Retrieve the token and user data from local storage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('userData');

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser)); // Parse and set user data
        }
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data as string
        setIsAuthenticated(true);
        setUser(userData); // Set the user data in context
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null); // Clear user data on logout
    };

    return (
        <AppContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
