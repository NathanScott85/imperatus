import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
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
import { DELETE_USER_MUTATION } from '../graphql/delete-user';
import { Role } from '../types';

interface Roles {
    role: Role;
}

interface User {
    id: number;
    email: string;
    fullname: string;
    dob: any;
    address: string;
    city: string;
    postcode: string;
    phone: string;
    password: string;
    userRoles: Roles[];
    emailVerified: boolean;
}

interface AppContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
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
    deleteUserAccount: (id: number) => Promise<void>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useApolloClient();
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(
        sessionStorage.getItem('accessToken'),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        sessionStorage.getItem('refreshToken'),
    );

    const [showExpiryPopup, setShowExpiryPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        onCompleted: async () => {
            clearSession();
            await client.refetchQueries({ include: 'active' });
            await client.resetStore();
            navigate('/account/sign-out');
        },
        onError: async (error) => {
            console.error('Logout error:', error);
            clearSession();
            await client.refetchQueries({ include: 'active' });
            await client.resetStore();
            navigate('/account/sign-out');
        },
    });

    const [requestPasswordResetMutation] = useMutation(
        REQUEST_PASSWORD_RESET_MUTATION,
    );
    const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

    const [changePasswordMutation] = useMutation(CHANGE_PASSWORD_MUTATION);

    const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

    const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);

    useEffect(() => {
        const storedUser = JSON.parse(
            sessionStorage.getItem('userData') || 'null',
        );
        if (accessToken && refreshToken && storedUser) {
            if (!isTokenExpired(accessToken)) {
                setIsAuthenticated(true);
                setUser(storedUser);
                checkTokenExpiry(accessToken);
            } else {
                handleTokenExpiry(storedUser);
            }
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        return () => {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        };
    }, [logoutTimer]);

    useEffect(() => {
        if (accessToken) {
            if (isTokenExpiringSoon(accessToken)) {
                setShowExpiryPopup(true);
            }
            if (isTokenExpired(accessToken)) {
                handleTokenExpiry(user);
            }
        }
    }, [user, accessToken]);

    const login = (
        accessToken: string,
        refreshToken: string,
        userData: User,
    ) => {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        setUser(userData);
        checkTokenExpiry(accessToken);
    };

    const logout = () => {
        if (refreshToken) {
            logoutMutation({ variables: { refreshToken } });
        } else {
            clearSession();
            navigate('/account/sign-out');
        }
    };

    const deleteUserAccount = async (id: number) => {
        try {
            const { data } = await deleteUserMutation({
                variables: { id },
            });

            if (
                data.deleteUser.message === 'User account deleted successfully'
            ) {
                clearSession();
                navigate('/account/login');
            } else {
                throw new Error('Failed to delete account');
            }
        } catch (error) {
            console.error('Delete user account error:', error);
            throw new Error('An error occurred during account deletion.');
        }
    };

    const clearSession = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userData'); // Clear user data from sessionStorage
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
        setUser(null);
        setShowExpiryPopup(false);
        if (logoutTimer) clearTimeout(logoutTimer);
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
                const storedUser = JSON.parse(
                    sessionStorage.getItem('userData') || 'null',
                );
                setIsAuthenticated(true);
                setUser(storedUser || currentUser);
                setShowExpiryPopup(false);
                checkTokenExpiry(newAccessToken);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        if (!refreshToken) return null;

        try {
            const response = await refreshTokenMutation({
                variables: { refreshToken },
            });
            const { accessToken, refreshToken: newRefreshToken } =
                response.data.refreshToken;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', newRefreshToken);
            setAccessToken(accessToken);
            setRefreshToken(newRefreshToken);
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
            const storedUser = JSON.parse(
                sessionStorage.getItem('userData') || 'null',
            );
            const token = accessToken;

            if (!storedUser || !token) {
                throw new Error('User is not logged in or token is missing');
            }

            if (storedUser.id !== id) {
                throw new Error('User ID does not match');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const { data } = await changePasswordMutation({
                variables: { id: storedUser.id, oldPassword, newPassword },
                context: {
                    headers,
                },
            });

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
        user?.userRoles.map((role) => role.role.name) || [];
    const isAdminOrOwner =
        userRoles.includes('ADMIN') || userRoles.includes('OWNER');

    const handleExtendSession = async () => {
        await handleTokenExpiry(user);
        if (logoutTimer) clearTimeout(logoutTimer);
    };

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                userRoles,
                isAdminOrOwner,
                isAuthenticated,
                login,
                logout,
                requestPasswordReset,
                resetPassword,
                changeUserPassword,
                deleteUserAccount,
            }}
        >
            {children}
            {showExpiryPopup && (
                <SessionExpiryPopup
                    show={showExpiryPopup}
                    loading={loading}
                    onExtendSession={handleExtendSession}
                    onLogout={logout}
                />
            )}
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
