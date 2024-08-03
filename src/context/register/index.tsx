// src/context/register.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/register';
import { SEND_VERIFICATION_EMAIL } from '../../graphql/verification-email';

interface RegisterContextProps {
    data: any;
    loading: boolean;
    error: any;
    handleRegisterUser: (data: {
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
}

const RegisterContext = createContext<RegisterContextProps | undefined>(
    undefined,
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const [sendVerificationEmail] = useMutation(SEND_VERIFICATION_EMAIL);
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
            // Ensure the input is wrapped with the key "input"
            const { data } = await registerUser({ variables: { input } });
            if (data && data.registerUser) {
                const userId = data.registerUser.id;
                await sendVerificationEmail({ variables: { userId } });
            }
            return data.registerUser;
        } catch (err: any) {
            console.error('Mutation error:', err);
            if (
                err.message.includes(
                    'An account with this email already exists',
                )
            ) {
                throw new Error('An account with this email already exists');
            }
            throw new Error('Registration failed. Please try again.');
        }
    };

    return (
        <RegisterContext.Provider
            value={{
                data,
                loading,
                error,
                handleRegisterUser,
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
