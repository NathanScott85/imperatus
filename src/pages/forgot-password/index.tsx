// src/components/ForgotPassword.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';
import Button from '../../components/button';
import { useAppContext } from '../../context';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { requestPasswordReset } = useAppContext();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate email format
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            // Call the password reset function from the context
            const message = await requestPasswordReset(email);

            if (message) {
                setSuccessMessage(message);
                // Redirect to the reset password form with email in state
                navigate('/account/reset-password', { state: { email } }); // Pass email in the navigation state
            } else {
                setError(
                    'An error occurred while attempting to reset the password. Please try again later.',
                );
            }
        } catch (err) {
            console.error('Password reset error:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Forgot Password" />
            <MainContainer>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <Form onSubmit={handleFormSubmit}>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    variant="secondary"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                {successMessage && (
                                    <SuccessMessage>
                                        {successMessage}
                                    </SuccessMessage>
                                )}
                                <Button
                                    label="Verify"
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={!email || !emailRegex.test(email)}
                                />
                            </Form>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>
            </MainContainer>
            <Footer />
        </>
    );
};

// Styled components
const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #130a30;
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
        color: white;
    }

    input {
        margin-bottom: 1rem;
    }
    z-index: 50;
`;

const Label = styled.label`
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
    color: green;
    margin-top: 0.5rem;
`;

export default ForgotPassword;
