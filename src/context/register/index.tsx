// src/context/register.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/register';
import { SEND_VERIFICATION_EMAIL } from '../../graphql/verification-email';

type RegisterContextProps = {
    data: any;
    loading: boolean;
    error: string | null;
    handleRegisterUser: (input: {
        fullname: string;
        email: string;
        password: string;
        dob: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
        roles?: string[];
    }) => Promise<any>;
    clearError: () => void; // Add the clearError function to the context type
};

// Create a context with default values
const RegisterContext = createContext<RegisterContextProps | undefined>(
    undefined,
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const [sendVerificationEmail] = useMutation(SEND_VERIFICATION_EMAIL);
    const [localError, setLocalError] = useState<string | null>(null); // Local state for error

    // Handles the user registration process
    const handleRegisterUser = async (input: {
        fullname: string;
        email: string;
        password: string;
        dob: string;
        phone: string;
        address: string;
        city: string;
        postcode: string;
    }) => {
        try {
            const { data } = await registerUser({ variables: { input } });
            if (data && data.registerUser) {
                const userId = data.registerUser.id;
                await sendVerificationEmail({ variables: { userId } });
            }
            setLocalError(null); // Clear local error on success
            return data.registerUser;
        } catch (err: any) {
            console.error('Mutation error:', err);
            setLocalError(
                err.message || 'Registration failed. Please try again.',
            );
            throw new Error(
                err.message || 'Registration failed. Please try again.',
            );
        }
    };

    // Method to clear error
    const clearError = () => {
        setLocalError(null);
    };

    return (
        <RegisterContext.Provider
            value={{
                data,
                loading,
                error: localError, // Use localError instead of mutation error
                handleRegisterUser,
                clearError, // Provide the clearError function to the context
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (context === undefined) {
        throw new Error('useRegister must be used within a RegisterProvider');
    }
    return context;
};
