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
    const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { resetPassword } = useAppContext();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    useEffect(() => {
        if (!token || !email) {
            navigate('/account/forgot-password');
        }
    }, [token, email, navigate]);

    const validateField = (field: string, value: string): string => {
        if (field === 'newPassword') {
            return value.length >= 8 ? '' : 'Password must be at least 8 characters';
        }
        if (field === 'confirmPassword') {
            return value === newPassword ? '' : 'Passwords do not match';
        }
        return '';
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));

        setSuccessMessage('');
    };

    const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPasswordError = validateField('newPassword', newPassword);
        const confirmPasswordError = validateField('confirmPassword', confirmPassword);

        if (newPasswordError || confirmPasswordError) {
            setErrors({ newPassword: newPasswordError, confirmPassword: confirmPasswordError });
            return;
        }

        setLoading(true);
        try {
            const message = await resetPassword(token as string, newPassword, email as string);

            if (message) {
                setSuccessMessage(message);
                setTimeout(() => navigate('/account/login'), 3000);
            } else {
                setErrors({ newPassword: 'An error occurred. Please try again later.' });
            }
        } catch (err: any) {
            console.error('Password reset error:', err);
            const errorMessage = err instanceof Error && err.message.includes('expired')
                ? 'This reset link has expired. Please request a new one.'
                : 'An unexpected error occurred. Please try again.';
            setErrors({ newPassword: errorMessage });
        }
        setLoading(false);
    };

    if (successMessage) {
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
                                <h1>Password Reset Successful</h1>
                                <p>{successMessage}</p>
                                <p>Redirecting you to login...</p>
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
            <BreadCrumb label="Reset Password" />
            <MainContainer>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <Form onSubmit={handlePasswordSubmit}>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    variant="secondary"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your new password"
                                    required
                                    showToggle
                                />
                                {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}

                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    variant="secondary"
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm your new password"
                                    required
                                    showToggle
                                />
                                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

                                <Button
                                    label={loading ? 'Resetting...' : 'Reset Password'}
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !newPassword ||
                                        !confirmPassword ||
                                        !!errors.newPassword ||
                                        !!errors.confirmPassword
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
    width: 350px;
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
    font-size: 12px;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
`;

export default ResetPassword;
