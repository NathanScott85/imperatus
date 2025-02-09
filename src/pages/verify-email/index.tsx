import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useVerificationContext } from '../../context/verification';
import { useAppContext } from '../../context';
import { GET_VERIFICATION_STATUS } from '../../graphql/verification-status';
import { FancyContainer } from '../../components/fancy-container';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Input } from '../../components/input';
import Button from '../../components/button';
import { Footer } from '../../components/footer';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [localError, setLocalError] = useState('');
    const { verifyEmail, loading, error } = useVerificationContext();
    const navigate = useNavigate();
    const { user } = useAppContext();

    const userId = user ? user.id : null;

    const { data, loading: statusLoading, error: statusError } = useQuery(GET_VERIFICATION_STATUS, {
        variables: { userId },
        skip: !userId,
    });

    useEffect(() => {
        if (data?.getVerificationStatus?.emailVerified) {
            navigate('/account/verification-status');
        }
    }, [data, navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
        setLocalError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await verifyEmail(verificationCode);
            navigate('/account/verification-success');
        } catch (err) {
            setLocalError(
                'Invalid or expired verification code. Please try again.',
            );
        }
    };

    if (statusLoading) {
        return <p>Checking verification status...</p>;
    }

    if (statusError) {
        console.error('Verification status error:', statusError);
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
                            <h1>Email Verification</h1>
                            <p>
                                Please enter the verification code sent to your
                                email to complete your registration.
                            </p>
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="verificationCode">
                                    Verification Code
                                </label>
                                <Input
                                    variant="secondary"
                                    type="text"
                                    id="verificationCode"
                                    name="verificationCode"
                                    value={verificationCode}
                                    onChange={handleInputChange}
                                />
                                {localError && (
                                    <ErrorParagraph>
                                        {localError}
                                    </ErrorParagraph>
                                )}
                                <Button
                                    label="Verify"
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={!verificationCode || loading}
                                />
                            </Form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error.message}</p>}
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>
            </VerifyEmailMain>
            <Footer />
        </>
    );
};

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
