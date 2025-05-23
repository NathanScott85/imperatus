import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';
import { mediaQueries } from '../../styled/breakpoints';
import Button from '../../components/button';
import { FormInformation } from '../../components/form/form-information';
import { useAppContext } from '../../context';
import { LOGIN_MUTATION } from '../../graphql/login';

export const Login = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const { login } = useAppContext();
    const navigate = useNavigate();
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account/my-account', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return <>Loading ......</>

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = { ...errors };
        let valid = true;

        if (!formData.email) {
            newErrors.email = 'Email address is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
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
        if (validateForm()) {
            try {
                const { data } = await loginUser({
                    variables: {
                        email: formData.email,
                        password: formData.password,
                    },
                });

                if (data && data.loginUser) {
                    const { accessToken, refreshToken, user } = data.loginUser;
                
                    if (!user.emailVerified) {
                        navigate('/account/check-your-email', {
                            state: { userId: user.id }
                        });
                        return;
                    }
                
                    login(accessToken, refreshToken, user);
                    navigate('/account/my-account');
                }                
            } catch (err) {
                console.error('Login failed:', err);
            }
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Login" />
            <MainContainer>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <Form onSubmit={handleSubmit}>
                            <FormContents>
                                <label>Email Address</label>
                                      <Input
                                        type='email'
                                        value={formData.email}
                                        name="email"
                                        variant="secondary"
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter Your Email"
                                        />
                                {errors.email && (
                                    <StyledParagraph>{errors.email}</StyledParagraph>
                                )}

                                <label>Password</label>
                                <Input
                                    value={formData.password}
                                    name="password"
                                    variant="secondary"
                                    type="password"
                                    showToggle
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Password"
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
                                        label="Login"
                                        variant="primary"
                                        size="small"
                                        type="submit"
                                        disabled={loading}
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
                    <FormInformation login />
                </Section>
            </MainContainer>
            <Footer />
        </>
    );
};

// Styled components definitions (remain unchanged)
const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #130a30;
`;

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    min-height: 650px;
    color: black;
    font-size: 1.5rem;
    margin-bottom: 10rem;
    ${mediaQueries('sm')`
         flex-direction: column;
         align-items: center;
    `};
    ${mediaQueries('sm')`
        flex-direction: row;
        align-items: center;
   `};
`;

const FormContents = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
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
    margin: 0.5rem 0rem 0rem 0rem;
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 350px;
`;
