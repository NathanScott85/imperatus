// src/pages/verify.js
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useVerificationContext } from '../../context/verification';
import { FancyContainer } from '../../components/fancy-container';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Input } from '../../components/input';
import Button from '../../components/button';

export const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const { verifyEmail, data, loading } = useVerificationContext();
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await verifyEmail(verificationCode);
            navigate('/account/verification-success');
        } catch (err) {
            setError('Invalid or expired verification code. Please try again.');
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Email Verification" />
            <VerifyEmailMain>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <div>
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
                                {error && (
                                    <ErrorParagraph>{error}</ErrorParagraph>
                                )}
                                <Button
                                    label="Verify"
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={!verificationCode}
                                />
                            </Form>
                            {loading && <p>Loading...</p>}
                            {data && <p>Verification successful!</p>}
                        </div>
                    </FancyContainer>
                </Section>
            </VerifyEmailMain>
        </>
    );
};

const VerifyEmailMain = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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
