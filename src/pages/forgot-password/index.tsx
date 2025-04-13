import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';
import Button from '../../components/button';
import { useAppContext } from '../../context';
import { HomeIcon } from '../../components/svg/home';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { requestPasswordReset } = useAppContext();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const message = await requestPasswordReset(email);
            if (message) {
                setSuccessMessage(message);
            } else {
                setError('An error occurred while attempting to reset the password. Please try again later.');
            }
        } catch (err) {
            console.error('Password reset error:', err);
            setError('An unexpected error occurred. Please try again.');
        }
        setLoading(false);
    };

    if (successMessage) {
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
                                <h1>Check Your Email</h1>
                                <SuccessMessage>{successMessage}</SuccessMessage>
                                <Link to="/" aria-label="Go to Home Page">
                                <p>You can close this page or go to:</p>
                                    <HomeIcon aria-hidden="true" />
                                </Link>
                            </FancyContainerSubWrapper>
                        </FancyContainer>
                    </Section>
                </MainContainer>
                <Footer />
            </>
        );
    }

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
                                    required
                                />
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                <Button
                                    label={loading ? 'Sending...' : 'Verify'}
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={loading || !email || !emailRegex.test(email)}
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
        z-index: 10;
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

    input {
        margin-bottom: 1rem;
    }

    z-index: 50;
`;

const Label = styled.label`
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #fff;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 14px;
    margin-bottom: 1rem;
    text-align: center;
`;

export default ForgotPassword;
