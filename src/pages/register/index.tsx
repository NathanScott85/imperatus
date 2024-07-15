import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer } from '../../components/styled';
import { FancyContainer } from '../../components/fancy-container';
import Button from '../../components/button';
import { Input } from '../../components/input';
import { FormInformation } from '../../components/form/form-information';

type DOB = {
    day?: string;
    month?: string;
    year?: string;
};

type Address = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
};

interface FormErrors {
    address: Address;
    dateOfBirth: DOB;
}

export const Register = () => {
    const [formData, setFormData] = useState<FormErrors>({
        address: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            address1: '',
            address2: '',
            city: '',
            postalCode: '',
        },
        dateOfBirth: {
            day: '',
            month: '',
            year: '',
        },
    });

    const [errors, setErrors] = useState<FormErrors>({
        address: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            address1: '',
            address2: '',
            city: '',
            postalCode: '',
        },
        dateOfBirth: {
            day: '',
            month: '',
            year: '',
        },
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'day' || name === 'month' || name === 'year') {
            setFormData({
                ...formData,
                dateOfBirth: {
                    ...formData.dateOfBirth,
                    [name]: value,
                },
            });
            setErrors({
                ...errors,
                dateOfBirth: {
                    ...errors.dateOfBirth,
                    [name]: '',
                },
            });
        } else {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name]: value,
                },
            });

            if (name === 'password' && value.length >= 8) {
                setErrors({
                    ...errors,
                    address: { ...errors.address, [name]: '' },
                });
            } else if (name === 'password' && value.length < 8) {
                setErrors({
                    ...errors,
                    address: {
                        ...errors.address,
                        [name]: 'Password must be at least 8 characters',
                    },
                });
            } else {
                setErrors({
                    ...errors,
                    address: { ...errors.address, [name]: '' },
                });
            }
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {
            address: {
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: '',
                address1: '',
                address2: '',
                city: '',
                postalCode: '',
            },
            dateOfBirth: {
                day: '',
                month: '',
                year: '',
            },
        };

        const { address, dateOfBirth } = formData;

        if (!address.fullName)
            newErrors.address.fullName = 'Full Name is required';
        if (!address.email)
            newErrors.address.email = 'Email address is required';
        if (!/\S+@\S+\.\S+/.test(address.email))
            newErrors.address.email = 'Email address is invalid';
        if (!address.password)
            newErrors.address.password = 'Password is required';
        if (address.password.length < 8)
            newErrors.address.password =
                'Password must be at least 8 characters';
        if (address.password !== address.confirmPassword)
            newErrors.address.confirmPassword = 'Passwords do not match';
        if (!address.phoneNumber)
            newErrors.address.phoneNumber = 'Phone Number is required';
        if (!address.address1)
            newErrors.address.address1 = 'Address is required';
        if (!address.city) newErrors.address.city = 'Town/City is required';
        if (!address.postalCode)
            newErrors.address.postalCode = 'Postal/Zip code is required';

        if (dateOfBirth) {
            const dobError = validateDateOfBirth(
                dateOfBirth.day,
                dateOfBirth?.month,
                dateOfBirth.year,
            );
            if (dobError) {
                newErrors.dateOfBirth = {
                    day: dobError,
                    month: dobError,
                    year: dobError,
                };
            }
        }

        setErrors(newErrors);
        return (
            Object.keys(newErrors.address).length === 0 &&
            (!newErrors.dateOfBirth ||
                Object.keys(newErrors.dateOfBirth).length === 0)
        );
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission
            console.log('Form submitted:', formData);
        } else {
            console.log('Form validation failed');
        }
    };

    const validateDateOfBirth = (
        day: string | undefined,
        month: string | undefined,
        year: string | undefined,
    ) => {
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 120;
        const maxYear = currentYear - 18;

        const dayNum = Number(day);
        const monthNum = Number(month);
        const yearNum = Number(year);

        if (!day || !month || !year) return 'Date of Birth is required';
        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum))
            return 'Date of Birth must be numbers';

        if (yearNum < minYear || yearNum > maxYear)
            return `Year must be between ${minYear} and ${maxYear}`;

        if (monthNum < 1 || monthNum > 12)
            return 'Month must be between 1 and 12';

        const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
        if (dayNum < 1 || dayNum > daysInMonth)
            return `Day must be between 1 and ${daysInMonth}`;

        const date = new Date(yearNum, monthNum - 1, dayNum);
        if (
            date.getFullYear() !== yearNum ||
            date.getMonth() !== monthNum - 1 ||
            date.getDate() !== dayNum
        )
            return 'Invalid Date of Birth';

        return null;
    };
    const { address, dateOfBirth } = formData;
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Register" />
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
                                    value={address.fullName}
                                    onChange={handleInputChange}
                                />
                                {errors.address.fullName && (
                                    <StyledParagraph>
                                        {errors.address.fullName}
                                    </StyledParagraph>
                                )}

                                <label>Email address</label>
                                <Input
                                    variant="secondary"
                                    name="email"
                                    value={address.email}
                                    onChange={handleInputChange}
                                />
                                {errors.address.email && (
                                    <StyledParagraph>
                                        {errors.address.email}
                                    </StyledParagraph>
                                )}

                                <label>Password</label>
                                <Input
                                    variant="secondary"
                                    name="password"
                                    type="password"
                                    value={address.password}
                                    onChange={handleInputChange}
                                />
                                {errors.address.password && (
                                    <StyledParagraph>
                                        {errors.address.password}
                                    </StyledParagraph>
                                )}

                                <label>Confirm Password</label>
                                <Input
                                    variant="secondary"
                                    name="confirmPassword"
                                    type="password"
                                    value={address.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {errors.address.confirmPassword && (
                                    <StyledParagraph>
                                        {errors.address.confirmPassword}
                                    </StyledParagraph>
                                )}

                                <BirthdayContainer>
                                    <label>Birthday</label>
                                    <BirthdayWrapper>
                                        <Input
                                            variant="birthday"
                                            name="day"
                                            placeholder="DD"
                                            value={dateOfBirth.day}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            variant="birthday"
                                            name="month"
                                            placeholder="MM"
                                            value={dateOfBirth.month}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            variant="birthday"
                                            name="year"
                                            placeholder="YYYY"
                                            value={dateOfBirth.year}
                                            onChange={handleInputChange}
                                        />
                                    </BirthdayWrapper>
                                    {(errors.dateOfBirth.day ||
                                        errors.dateOfBirth.month ||
                                        errors.dateOfBirth.year) && (
                                        <StyledParagraph>
                                            {errors.dateOfBirth.day ||
                                                errors.dateOfBirth.month ||
                                                errors.dateOfBirth.year}
                                        </StyledParagraph>
                                    )}
                                </BirthdayContainer>
                            </>
                            <>
                                <h1>Contact Details</h1>
                                <label>Phone Number</label>
                                <Input
                                    variant="secondary"
                                    name="phoneNumber"
                                    value={address.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.address.phoneNumber && (
                                    <StyledParagraph>
                                        {errors.address.phoneNumber}
                                    </StyledParagraph>
                                )}

                                <label>Address</label>
                                <Input
                                    variant="secondary"
                                    name="address1"
                                    value={address.address1}
                                    onChange={handleInputChange}
                                />
                                {errors.address.address1 && (
                                    <StyledParagraph>
                                        {errors.address.address1}
                                    </StyledParagraph>
                                )}

                                <label>Address</label>
                                <Input
                                    variant="secondary"
                                    name="address2"
                                    value={address.address2}
                                    onChange={handleInputChange}
                                />

                                <label>Town / City</label>
                                <Input
                                    variant="secondary"
                                    name="city"
                                    value={address.city}
                                    onChange={handleInputChange}
                                />
                                {errors.address.city && (
                                    <StyledParagraph>
                                        {errors.address.city}
                                    </StyledParagraph>
                                )}

                                <label>Postal / Zip code</label>
                                <Input
                                    variant="secondary"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleInputChange}
                                />
                                {errors.address.postalCode && (
                                    <StyledParagraph>
                                        {errors.address.postalCode}
                                    </StyledParagraph>
                                )}
                                <StyledFormWrapper></StyledFormWrapper>
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

const StyledFormWrapper = styled.div`
    margin-top: 1rem;
`;

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
    font-size: 10px;
    margin: 0.5rem 0rem 0.5rem 0rem;
`;
