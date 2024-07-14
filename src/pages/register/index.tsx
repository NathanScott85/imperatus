import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer, Container } from '../../components/styled';
import { FancyContainer } from '../../components/fancy-container';
import Button from '../../components/button';
import { Input } from '../../components/input';
import { FormInformation } from '../../components/form/form-information';

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    address1?: string;
    city?: string;
    postalCode?: string;
    birthdayDay?: string;
    birthdayMonth?: string;
    birthdayYear?: string;
}

export const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        birthdayDay: '',
        birthdayMonth: '',
        birthdayYear: '',
    });

    const [errors, setErrors] = useState<FormErrors | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email address is required';
        if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.phoneNumber)
            newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.address1) newErrors.address1 = 'Address is required';
        if (!formData.city) newErrors.city = 'Town/City is required';
        if (!formData.postalCode)
            newErrors.postalCode = 'Postal/Zip code is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission
            console.log('Form submitted:', formData);
        }
    };

    return (
        <>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label="Register" />
            <Container>
                <Background />
            </Container>
            <MainContainer>
                <Section>
                    <FancyContainer>
                        <Form onSubmit={handleSubmit}>
                            <>
                                <h1>Personal Details</h1>
                                <label>Full Name</label>
                                <Input
                                    variant="secondary"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                                {errors?.fullName && (
                                    <StyledParagraph>
                                        {errors.fullName}
                                    </StyledParagraph>
                                )}

                                <label>Email address</label>
                                <Input
                                    variant="secondary"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors?.email && (
                                    <StyledParagraph>
                                        {errors.email}
                                    </StyledParagraph>
                                )}

                                <label>Password</label>
                                <Input
                                    variant="secondary"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                {errors?.password && (
                                    <StyledParagraph>
                                        {errors.password}
                                    </StyledParagraph>
                                )}

                                <label>Confirm Password</label>
                                <Input
                                    variant="secondary"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {errors?.confirmPassword && (
                                    <StyledParagraph>
                                        {errors.confirmPassword}
                                    </StyledParagraph>
                                )}

                                <BirthdayContainer>
                                    <label>Birthday</label>
                                    <BirthdayWrapper>
                                        <Input
                                            variant="birthday"
                                            name="birthdayDay"
                                            placeholder="DD"
                                            value={formData.birthdayDay}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            variant="birthday"
                                            name="birthdayMonth"
                                            placeholder="MM"
                                            value={formData.birthdayMonth}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            variant="birthday"
                                            name="birthdayYear"
                                            placeholder="YYYY"
                                            value={formData.birthdayYear}
                                            onChange={handleInputChange}
                                        />
                                    </BirthdayWrapper>
                                </BirthdayContainer>
                            </>
                            <>
                                <h1>Contact Details</h1>
                                <label>Phone Number</label>
                                <Input
                                    variant="secondary"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                {errors?.phoneNumber && (
                                    <StyledParagraph>
                                        {errors.phoneNumber}
                                    </StyledParagraph>
                                )}

                                <label>Address</label>
                                <Input
                                    variant="secondary"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                />
                                {errors?.address1 && (
                                    <StyledParagraph>
                                        {errors.address1}
                                    </StyledParagraph>
                                )}

                                <label>Address</label>
                                <Input
                                    variant="secondary"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                />

                                <label>Town / City</label>
                                <Input
                                    variant="secondary"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                                {errors?.city && (
                                    <StyledParagraph>
                                        {errors.city}
                                    </StyledParagraph>
                                )}

                                <label>Postal / Zip code</label>
                                <Input
                                    variant="secondary"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                />
                                {errors?.postalCode && (
                                    <StyledParagraph>
                                        {errors.postalCode}
                                    </StyledParagraph>
                                )}
                                <Button
                                    label="Register"
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                />
                            </>
                        </Form>
                    </FancyContainer>
                    <FormInformation register />
                </Section>
            </MainContainer>
            <Footer />
        </>
    );
};

const BirthdayContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BirthdayWrapper = styled.div`
    display: flex;
    flex-direction: row;
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
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3.25rem;
    text-align: left;

    h1 {
        font-family: Cinzel;
        font-size: 26px;
        font-weight: 400;
        line-height: 35.05px;
        align-items: center;
        padding: 2.063rem 2.063rem 2.063rem 0;
    }

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

const StyledParagraph = styled.p`
    color: red;
`;

const Background = styled('div')`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;
