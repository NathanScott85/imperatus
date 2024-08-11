import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../graphql/logout';
import {
    REQUEST_PASSWORD_RESET_MUTATION,
    RESET_PASSWORD_MUTATION,
} from '../graphql/password-reset';
import { jwtDecode } from 'jwt-decode';
import SessionExpiryPopup from '../context/session-popup';
import { isTokenExpired, isTokenExpiringSoon } from '../lib/token';
import { REFRESH_TOKEN_MUTATION } from '../graphql/refresh-token';
import { CHANGE_PASSWORD_MUTATION } from '../graphql/change-password';

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
    changeUserPassword: (
        id: number,
        oldPassword: string,
        newPassword: string,
    ) => Promise<{ message: string } | null>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [showExpiryPopup, setShowExpiryPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        onCompleted: () => {
            clearSession();
            navigate('/account/sign-out');
        },
        onError: (error) => {
            console.error('Logout error:', error);
        },
    });

    const [requestPasswordResetMutation] = useMutation(
        REQUEST_PASSWORD_RESET_MUTATION,
    );
    const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

    const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_MUTATION);

    const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('userData');

        if (accessToken && refreshToken && storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            if (!isTokenExpired(accessToken)) {
                setIsAuthenticated(true);
                setUser(parsedUser);
                checkTokenExpiry(accessToken);
            } else {
                handleTokenExpiry(parsedUser);
            }
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            if (isTokenExpiringSoon(accessToken)) {
                setShowExpiryPopup(true);
            }
            if (isTokenExpired(accessToken)) {
                handleTokenExpiry(user);
            }
        }
    }, [user]);

    const login = (
        accessToken: string,
        refreshToken: string,
        userData: User,
    ) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        checkTokenExpiry(accessToken);
    };

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            logoutMutation({ variables: { refreshToken } });
        } else {
            clearSession();
            navigate('/account/sign-out');
        }
    };

    const clearSession = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null);
        setShowExpiryPopup(false);
        if (logoutTimer) clearTimeout(logoutTimer);
        console.log('Session cleared');
    };

    const checkTokenExpiry = (token: string) => {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiryTime - currentTime;

        if (timeLeft <= 60000) {
            setShowExpiryPopup(true);
            setLogoutTimer(setTimeout(() => logout(), timeLeft));
        } else {
            setTimeout(() => {
                if (isTokenExpiringSoon(token)) {
                    setShowExpiryPopup(true);
                }
            }, timeLeft - 60000);
            setLogoutTimer(setTimeout(() => logout(), timeLeft));
        }
    };

    const handleTokenExpiry = async (currentUser: User | null) => {
        setLoading(true);
        try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                const storedUser = localStorage.getItem('userData');
                const parsedUser = storedUser
                    ? JSON.parse(storedUser)
                    : currentUser;
                setIsAuthenticated(true);
                setUser(parsedUser);
                setShowExpiryPopup(false);
                checkTokenExpiry(newAccessToken);
                console.log('Session extended successfully');
            } else {
                logout();
                console.log('Failed to extend session, logging out');
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return null;

        try {
            const response = await refreshTokenMutation({
                variables: { refreshToken },
            });
            const { accessToken, refreshToken: newRefreshToken } =
                response.data.refreshToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            console.log('Access token refreshed successfully');
            return accessToken;
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            return null;
        }
    };
    const changeUserPassword = async (
        id: number,
        oldPassword: string,
        newPassword: string,
    ): Promise<{ message: string } | null> => {
        try {
            // Retrieve user and token from context
            const storedUser = localStorage.getItem('userData');
            const token = localStorage.getItem('accessToken');

            if (!storedUser || !token) {
                throw new Error('User is not logged in or token is missing');
            }

            const user = JSON.parse(storedUser);

            // Ensure the user ID matches the one passed in
            if (user.id !== id) {
                throw new Error('User ID does not match');
            }

            // Set the Authorization header
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Standard for GraphQL requests
            };
            console.log(user.id, 'user.id');
            const { data } = await changePasswordMutation({
                variables: { id: user.id, oldPassword, newPassword },
                context: {
                    headers,
                },
            });
            console.log(data, 'data');
            return data.changeUserPassword;
        } catch (error) {
            console.error('Change password error:', error);
            return null;
        }
    };

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

    const userRoles: string[] =
        user?.userRoles.map((roles: Roles) => roles.role.name) || [];
    const isAdminOrOwner =
        userRoles.includes('ADMIN') || userRoles.includes('OWNER');

    const handleExtendSession = async () => {
        console.log('Extending session...');
        await handleTokenExpiry(user);
        if (logoutTimer) clearTimeout(logoutTimer);
    };

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

                changeUserPassword,
            }}
        >
            {children}
            <SessionExpiryPopup
                show={showExpiryPopup}
                loading={loading}
                onExtendSession={handleExtendSession}
                onLogout={logout}
            />
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
