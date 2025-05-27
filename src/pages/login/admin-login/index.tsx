import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import { LOGIN_MUTATION } from '../../../graphql/login';
import { useAppContext } from '../../../context';
import { Footer } from '../../../components/footer';
import { LogoDragon } from '../../../components/svg/logo';

export const AdminLogin = ({
    isAuthenticated,
}: {
    isAuthenticated: boolean;
}) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { login } = useAppContext();
    const navigate = useNavigate();
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

    useEffect(() => {
        if (isAuthenticated) navigate('/account/admin', { replace: true });
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return <>Loading...</>;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = { ...errors };
        let valid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const { data } = await loginUser({
                variables: {
                    email: formData.email,
                    password: formData.password,
                },
            });

            if (data?.loginUser) {
                const { accessToken, refreshToken, user } = data.loginUser;

                if (!user.emailVerified) {
                    navigate('/account/check-your-email', {
                        state: { userId: user.id },
                    });
                    return;
                }

                const roles = user.userRoles.map((r: any) => r.role.name);

                if (!roles.includes('ADMIN') && !roles.includes('OWNER')) {
                    navigate('/not-authorized');
                    return;
                }

                login(accessToken, refreshToken, user);
                navigate('/account/admin');
            }
        } catch (err) {
            console.error('Admin login failed:', err);
        }
    };

    return (
        <Wrapper>
            <LogoWrapper>
                <LogoDragon />
            </LogoWrapper>
            <FancyContainer variant="login" size="login">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>Email</label>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            variant="secondary"
                            placeholder="Enter your email"
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}

                        <label>Password</label>
                        <Input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            variant="secondary"
                            showToggle
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <ErrorText>{errors.password}</ErrorText>
                        )}

                        {error && <ErrorText>{error.message}</ErrorText>}
                    </FormGroup>

                    <Actions>
                        <Button
                            label="Login"
                            variant="primary"
                            size="small"
                            type="submit"
                            disabled={loading}
                        />
                        {/* <Button
                            label="Forgot Password?"
                            variant="text"
                            pathname="/account/forgot-password"
                        /> */}
                    </Actions>
                </Form>
            </FancyContainer>
            {/* <Footer /> */}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: #130a30;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LogoWrapper = styled.div`
    margin: 3rem 0 1rem 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: #fff;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-family: Barlow;
        font-size: 16px;
        margin: 0.5rem 0 0.25rem 0;
    }
`;

const ErrorText = styled.p`
    color: red;
    font-size: 10px;
    margin: 0.25rem 0;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;
