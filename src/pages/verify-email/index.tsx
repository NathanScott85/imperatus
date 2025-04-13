import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useVerificationContext } from '../../context/verification';
import { useAppContext } from '../../context';
import { FancyContainer } from '../../components/fancy-container';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Input } from '../../components/input';
import Button from '../../components/button';
import { Footer } from '../../components/footer';
import { HomeIcon } from '../../components/svg/home';
import { Login } from '../../components/svg';

function useQueryParam() {
    return new URLSearchParams(useLocation().search);
}

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const { verifyEmail, getVerificationStatus, loading, verifyError, setVerifyError } = useVerificationContext();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppContext();
    const [autoNavigate, setAutoNavigate] = useState(true);
    const [countdown, setCountdown] = useState(5);
    const [isVerifiedNow, setIsVerifiedNow] = useState(false);
    const hasFetched = useRef(false);

    const query = useQueryParam();
    const token = query.get('token');

    useEffect(() => {
        if (user?.emailVerified && isAuthenticated) {
            navigate('/account/my-account');
        }
    }, [user, isAuthenticated, navigate]);

    useEffect(() => {
        if (token) {
            setVerificationCode(token);
        }
    }, [token]);

    useEffect(() => {
        if (!user?.emailVerified && user?.id && !hasFetched.current) {
            hasFetched.current = true;
            getVerificationStatus(user.id);
        }
    }, [user, getVerificationStatus]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
        setVerifyError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) {
            setVerifyError('Verification token is missing or you have entered an invalid token');
            return;
        }

        try {
            await verifyEmail(token);
            setIsVerifiedNow(true);
            setCountdown(5);
        } catch (err) {
            setVerifyError('Invalid or expired verification code. Please try again.');
        }
    };


    useEffect(() => {
        if (!isVerifiedNow || !autoNavigate || verifyError) return;

        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        }

        if (countdown === 0) {
            navigate('/account/login');
        }
    }, [isVerifiedNow, countdown, autoNavigate, verifyError, navigate]);

    useEffect(() => {
        if (autoNavigate && isVerifiedNow && !verifyError) {
            setCountdown(5);
        }
    }, [autoNavigate, isVerifiedNow, verifyError]);

    if (loading) {
        return <p>Checking verification status...</p>;
    }

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Email Verification" />
            <VerifyEmailMain>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                        <h1>{verifyError ? <h1>Email Verification Error</h1> : <h1>Email Verification </h1>}</h1>
                            {!isVerifiedNow && !isAuthenticated && (
                                <>
                                    <p>
                                        Please enter the verification code sent to your email to complete your registration.
                                    </p>
                                    <Form onSubmit={handleSubmit}>
                                        <label htmlFor="verificationCode">Verification Code</label>
                                        <Input
                                            variant="secondary"
                                            type="text"
                                            id="verificationCode"
                                            name="verificationCode"
                                            value={verificationCode}
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            label="Verify"
                                            variant="primary"
                                            size="small"
                                            type="submit"
                                            disabled={!verificationCode || loading}
                                        />
                                    </Form>
                                    {loading && <p>Loading...</p>}

                                </>
                            )}

                            {isVerifiedNow && !verifyError && (
                                <CheckboxContainer>
                                    <SuccessParagraph>Your email has been successfully verified!</SuccessParagraph>
                                    {autoNavigate && (
                                        <p>Redirecting to login in {countdown} seconds...</p>
                                    )}
                                    <label htmlFor="disableAutoNavigate">
                                        <input
                                            type="checkbox"
                                            checked={!autoNavigate}
                                            onChange={() => setAutoNavigate(!autoNavigate)}
                                        />
                                        Disable Auto-Navigate
                                    </label>
                                    <p>
                                        Go to login now:
                                    </p>
                                    <Login />
                                </CheckboxContainer>
                            )}

                        {verifyError && (
                            <>
                                <ErrorParagraph>{verifyError}</ErrorParagraph>
                            </>
                        )}
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>
            </VerifyEmailMain>
            <Footer />
        </>
    );
};

const SuccessParagraph = styled.p`
    color: #4caf50; // green
    font-size: 14px;
    margin: 1rem 0;
    font-family: 'Barlow', sans-serif;
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

const VerifyEmailMain = styled.main`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    label {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
    }

    input {
        margin-bottom: 1rem;
    }
`;

const ErrorParagraph = styled.p`
    color: red;
    font-size: 10px;
    margin: 0.5rem 0rem 0.5rem 0rem;
`;

const CheckboxContainer = styled.div`
    margin: 1rem;
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: white;

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.75rem;
        font-size: 14px;
    }
    input {
        margin-right: 0.5rem;
        cursor: pointer;
        z-index: 5;
    }
`;
