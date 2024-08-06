import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../graphql/logout';
import {
    REQUEST_PASSWORD_RESET_MUTATION,
    RESET_PASSWORD_MUTATION,
} from '../graphql/password-reset';

// Define interfaces for roles and users
interface Role {
    id: number;
    name: string;
}

interface Roles {
    role: Role;
}

interface User {
    id: number;
    email: string;
    fullname: string;
    userRoles: Roles[];
}

interface AppContextProps {
    user: User | null;
    userRoles: string[];
    isAuthenticated: boolean;
    isAdminOrOwner: boolean;
    login: (accessToken: string, refreshToken: string, user: User) => void;
    logout: () => void;
    requestPasswordReset: (email: string) => Promise<string | null>;
    resetPassword: (
        token: string,
        newPassword: string,
        email: string,
    ) => Promise<string | null>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        onCompleted: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/account/sign-out');
        },
        onError: (error) => {
            console.error('Logout error:', error);
        },
    });

    // Password reset request mutation
    const [requestPasswordResetMutation] = useMutation(
        REQUEST_PASSWORD_RESET_MUTATION,
    );

    // Reset password mutation
    const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

    // Function to request a password reset
    const requestPasswordReset = async (
        email: string,
    ): Promise<string | null> => {
        try {
            const { data } = await requestPasswordResetMutation({
                variables: { email },
            });
            return data.requestPasswordReset.message;
        } catch (error) {
            console.error('Password reset request error:', error);
            return null;
        }
    };

    // Function to reset password
    const resetPassword = async (
        token: string,
        newPassword: string,
        email: string,
    ): Promise<string | null> => {
        try {
            const { data } = await resetPasswordMutation({
                variables: { token, newPassword, email },
            });
            return data.resetPassword.message;
        } catch (error) {
            console.error('Reset password error:', error);
            return null;
        }
    };

    useEffect(() => {
        // Retrieve the tokens and user data from local storage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('userData');

        if (accessToken && refreshToken && storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setIsAuthenticated(true);
            setUser(parsedUser);
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
            navigate('/account/sign-out');
        }
    };

    const userRoles: string[] =
        user?.userRoles.map((roles: Roles) => roles.role.name) || [];
    const isAdminOrOwner =
        userRoles.includes('ADMIN') || userRoles.includes('OWNER');

    return (
        <AppContext.Provider
            value={{
                user,
                userRoles,
                isAdminOrOwner,
                isAuthenticated,
                login,
                logout,
                requestPasswordReset,
                resetPassword,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
