import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FancyContainer } from '../../components/fancy-container';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { BreadCrumb } from '../../components/breadcrumbs';
import Button from '../../components/button';
import { useVerificationContext } from '../../context/verification';

export const CheckYourEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resendVerificationEmail, loading, resendError } =
        useVerificationContext();
    const [message, setMessage] = useState('');

    const userId = location.state?.userId;

    useEffect(() => {
        if (!userId) {
            navigate('/register');
        }
    }, [userId, navigate]);

    const handleResend = async () => {
        setMessage('');

        if (!userId) {
            setMessage(
                'Unable to resend verification email — please register again.',
            );
            return;
        }

        try {
            await resendVerificationEmail(userId);
            if (resendError) {
                setMessage('');
            } else {
                setMessage('Verification email resent successfully.');
                navigate('/account/verify-email');
            }
        } catch (err) {
            console.error('Resend encountered an exception:', err);
            setMessage('');
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Email Verification" />
            <CheckEmailMain>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <h1>Check Your Email</h1>
                            <p>
                                Thank you for registering with Imperatus Games!
                            </p>
                            <p>
                                Please check your inbox (and spam folder) for an
                                email with a verification link.
                            </p>
                            <p>
                                If you haven&apos;t received the email yet, make
                                sure to check your spam or junk folder.
                            </p>
                            <Button
                                label={
                                    loading
                                        ? 'Resending...'
                                        : 'Resend Verification Email'
                                }
                                variant="primary"
                                size="medium"
                                type="submit"
                                onClick={handleResend}
                                disabled={loading || !userId}
                            />
                            {resendError ? (
                                <Status>{resendError}</Status>
                            ) : (
                                message && <Status success>{message}</Status>
                            )}
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>
            </CheckEmailMain>
            <Footer />
        </>
    );
};

const CheckEmailMain = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 5.5rem;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #130a30;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 1.5rem;
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    p {
        margin: 1rem;
        font-family: 'Barlow', sans-serif;
        font-size: 14px;
    }
`;

const Status = styled.div<{ success?: boolean }>`
    margin-top: 1rem;
    font-size: 14px;
    color: ${({ success }) => (success ? '#90ee90' : '#ff6b6b')};
    font-family: 'Barlow', sans-serif;
`;
