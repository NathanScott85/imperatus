import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../../graphql/login';
import { useAppContext } from '../../../context';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import styled from 'styled-components';

export const LoginSection = () => {
    const { login } = useAppContext();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { email: '', password: '' };
        let hasError = false;

        if (!formData.email) {
            newErrors.email = 'Email required';
            hasError = true;
        }

        if (!formData.password) {
            newErrors.password = 'Password required';
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        try {
            const { data } = await loginUser({ variables: formData });
            if (data?.loginUser) {
                const { accessToken, refreshToken, user } = data.loginUser;
                if (!user.emailVerified) {
                    window.location.href = '/account/check-your-email';
                    return;
                }
                login(accessToken, refreshToken, user);
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <FancyContainer variant="login" size="login">
            <Form onSubmit={handleSubmit}>
                <FormContents>
                    <label>Email Address</label>
                    <Input
                        type="email"
                        value={formData.email}
                        name="email"
                        variant="small"
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <StyledParagraph>{errors.email}</StyledParagraph>
                    )}

                    <label>Password</label>
                    <Input
                        value={formData.password}
                        name="password"
                        type="password"
                        variant="small"
                        onChange={handleChange}
                        placeholder="Enter your password"
                        showToggle
                    />
                    {errors.password && (
                        <StyledParagraph>{errors.password}</StyledParagraph>
                    )}
                    {error && (
                        <StyledParagraph>
                            Login failed: {error.message}
                        </StyledParagraph>
                    )}

                    <StyledFormWrapper>
                        <Button
                            label={loading ? 'Logging in...' : 'Login'}
                            variant="primary"
                            size="small"
                            type="submit"
                        />
                        <Button
                            label="Forgot Password?"
                            variant="text"
                            pathname="/account/forgot-password"
                        />
                    </StyledFormWrapper>
                </FormContents>
            </Form>
        </FancyContainer>
    );
};

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 350px;
`;

const FormContents = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-family: Barlow;
        font-size: 16px;
        margin: 0.5rem 0 0.3rem;
    }
`;

const StyledFormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`;

const StyledParagraph = styled.p`
    color: red;
    font-size: 10px;
    margin: 0.5rem 0 0 0;
`;
