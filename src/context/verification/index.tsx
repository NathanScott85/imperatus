import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { VERIFY_EMAIL, RESEND_VERIFICATION_EMAIL, GET_VERIFICATION_STATUS } from '../../graphql/verification';

interface VerificationContextProps {
    verifyEmail: (token: string) => Promise<void>;
    resendVerificationEmail: (userId: number) => Promise<void>;
    getVerificationStatus: (userId: number) => void;
    setVerificationStatus: React.Dispatch<React.SetStateAction<string | null>>;
    verificationStatus: string | null;
    resendVerification: string | null;
    confirmEmail: string | null;
    setConfirmEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setVerifyError: React.Dispatch<React.SetStateAction<string | null>>
    verifyError: string | null;
    resendError: string | null;
    statusError: string | null;
    loading: boolean;
    successMessage: string | null;
}

const VerificationContext = createContext<VerificationContextProps | null>(null);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const [resendVerification, setResendVerification] = useState<string | null>(null);
    const [confirmEmail, setConfirmEmail] = useState<string | null>(null);
    const [verifyError, setVerifyError] = useState<string | null>(null);
    const [resendError, setResendError] = useState<string | null>(null);
    const [statusError, setStatusError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [getVerificationStatusQuery] = useLazyQuery(GET_VERIFICATION_STATUS, {
        onCompleted: (data) => {
            if (data?.getVerificationStatus) {
                setVerificationStatus(data.getVerificationStatus.message);
            }
        },
        onError: (err) => {
            setStatusError(err.message);
        }
    });

    const [verifyEmailMutation] = useMutation(VERIFY_EMAIL, {
        onCompleted: (data) => {
            setSuccessMessage('Email successfully verified');
            if (data?.verifyEmail) {
                setConfirmEmail(data.verifyEmail);
            }
        },
        onError: (err) => {
            setVerifyError(err.message);
        }
    });

    const [resendVerificationEmailMutation] = useMutation(RESEND_VERIFICATION_EMAIL, {
        onCompleted: (data) => {
            setSuccessMessage('Verification email has been sent!');
            setResendVerification(data?.resendVerificationEmail);
        },
        onError: (error) => {
            setResendError(error.message);
        }
    });

    const verifyEmail = async (token: string) => {
        setLoading(true);
        setVerifyError(null);
        try {
            await verifyEmailMutation({ variables: { token } });
        } catch (err: any) {
            setVerifyError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const getVerificationStatus = (userId: number) => {
        setStatusError(null);
        getVerificationStatusQuery({ variables: { userId } });
    };

    const resendVerificationEmail = async (userId: number) => {
        setLoading(true);
        setResendError(null);
        try {
            await resendVerificationEmailMutation({ variables: { userId } });
        } catch (err: any) {
            setResendError(err.message || 'Failed to resend verification email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VerificationContext.Provider
            value={{
                verifyEmail,
                resendVerificationEmail,
                getVerificationStatus,
                verificationStatus,
                resendVerification,
                confirmEmail,
                setConfirmEmail,
                verifyError,
                setVerifyError,
                resendError,
                statusError,
                loading,
                successMessage,
                setVerificationStatus,
            }}
        >
            {children}
        </VerificationContext.Provider>
    );
};

export const useVerificationContext = () => {
    const context = useContext(VerificationContext);
    if (!context) {
        throw new Error('useVerificationContext must be used within a VerificationProvider');
    }
    return context;
};
