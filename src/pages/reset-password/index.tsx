// src/components/ResetPassword.tsx
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';
import Button from '../../components/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context';

export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { resetPassword } = useAppContext();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    // Redirect if token or email is missing
    useEffect(() => {
        if (!token || !email) {
            navigate('/account/forgot-password'); // Redirect if token/email is missing
        }
    }, [token, email, navigate]);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
        setError('');
        setSuccessMessage('');
    };

    // Handle password form submission
    const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const message = await resetPassword(
                token as string,
                newPassword,
                email as string,
            );
            if (message) {
                setSuccessMessage(message);
                setTimeout(() => navigate('/account/login'), 3000); // Redirect after 3 seconds
            } else {
                setError(
                    'An error occurred while resetting the password. Please try again later.',
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
            <BreadCrumb label="Reset Password" />
            <MainContainer>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <Form onSubmit={handlePasswordSubmit}>
                                <Label htmlFor="newPassword">
                                    New Password
                                </Label>
                                <Input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    variant="secondary"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your new password"
                                    required
                                />
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    variant="secondary"
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm your new password"
                                    required
                                />
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                {successMessage && (
                                    <SuccessMessage>
                                        {successMessage}
                                    </SuccessMessage>
                                )}
                                <Button
                                    label="Reset Password"
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={
                                        !newPassword ||
                                        !confirmPassword ||
                                        newPassword !== confirmPassword
                                    }
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

export default ResetPassword;
