import React, { createContext, ReactNode, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from '../../graphql/verify-email';

interface VerificationContextProps {
    verifyEmail: (token: string) => Promise<void>;
    data: any;
    loading: boolean;
    error: any;
}

const VerificationContext = createContext<VerificationContextProps | null>(
    null,
);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
    const [verifyEmailMutation, { data, loading, error }] =
        useMutation(VERIFY_EMAIL);

    const verifyEmail = async (token: string) => {
        try {
            await verifyEmailMutation({ variables: { token } });
        } catch (err) {
            console.error('Verification error:', err);
            throw new Error('Verification failed. Please try again.');
        }
    };

    return (
        <VerificationContext.Provider
            value={{
                verifyEmail,
                data,
                loading,
                error,
            }}
        >
            {children}
        </VerificationContext.Provider>
    );
};

export const useVerificationContext = () => {
    const context = useContext(VerificationContext);
    if (!context) {
        throw new Error(
            'useVerificationContext must be used within a VerificationProvider',
        );
    }
    return context;
};
