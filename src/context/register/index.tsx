import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/register';
import { SEND_VERIFICATION_EMAIL } from '../../graphql/verification';

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
    clearError: () => void;
};

const RegisterContext = createContext<RegisterContextProps | undefined>(
    undefined,
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const [sendVerificationEmail] = useMutation(SEND_VERIFICATION_EMAIL);
    const [localError, setLocalError] = useState<string | null>(null);

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
            setLocalError(null);
            return data.registerUser;
        } catch (err: any) {
            console.error('Mutation error:', err);
            console.error(error, 'error');
            setLocalError(
                err.message || 'Registration failed. Please try again.',
            );
            throw new Error(
                err.message || 'Registration failed. Please try again.',
            );
        }
    };

    const clearError = () => {
        setLocalError(null);
    };

    return (
        <RegisterContext.Provider
            value={{
                data,
                loading,
                error: localError,
                handleRegisterUser,
                clearError,
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
