import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../graphql/logout'; // Import the mutation

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    email: string;
    fullname: string;
    userRoles: Role[];
}

interface AppContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string, user: User) => void;
    logout: () => void;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    // Define the logout mutation
    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        onCompleted: () => {
            // Handle what happens after successful logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/account/login'); // Redirect to login page
        },
        onError: (error) => {
            console.error('Logout error:', error);
            // You can add more error handling logic here if needed
        },
    });

    useEffect(() => {
        // Retrieve the tokens and user data from local storage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('userData');
        if (accessToken && refreshToken && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser)); // Parse and set user data
        }
    }, []);

    const login = (
        accessToken: string,
        refreshToken: string,
        userData: User,
    ) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data as string
        setIsAuthenticated(true);
        setUser(userData); // Set the user data in context
    };

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            // Call the logout mutation with refreshToken
            logoutMutation({ variables: { refreshToken } });
        } else {
            // Handle case where refreshToken might be missing
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/account/login'); // Redirect to login page
        }
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
