import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useRegister } from '../../context/register';

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
    address: Partial<Address>;
    dateOfBirth: Partial<DOB>;
}

export const Register = () => {
    const { handleRegisterUser, loading, error, clearError } = useRegister();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Address>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
    });

    const [dateOfBirth, setDateOfBirth] = useState<DOB>({
        day: '',
        month: '',
        year: '',
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

        clearError();

        if (name in formData) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            setErrors((prevErrors) => ({
                ...prevErrors,
                address: {
                    ...prevErrors.address,
                    [name]: validateField(name as keyof Address, value),
                },
            }));
        }

        if (name in dateOfBirth) {
            setDateOfBirth((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            setErrors((prevErrors) => ({
                ...prevErrors,
                dateOfBirth: {
                    ...prevErrors.dateOfBirth,
                    [name]: validateDateOfBirthField(name as keyof DOB, value),
                },
            }));
        }
    };

    const validateField = (field: keyof Address, value: string): string => {
        switch (field) {
            case 'fullName':
                return value ? '' : 'Full Name is required';
            case 'email':
                return /\S+@\S+\.\S+/.test(value)
                    ? ''
                    : 'Email address is invalid';
            case 'password':
                return value.length >= 8
                    ? ''
                    : 'Password must be at least 8 characters';
            case 'confirmPassword':
                return value === formData.password
                    ? ''
                    : 'Passwords do not match';
            case 'phoneNumber':
                return value ? '' : 'Phone Number is required';
            case 'address1':
                return value ? '' : 'Address is required';
            case 'city':
                return value ? '' : 'Town/City is required';
            case 'postalCode':
                return value ? '' : 'Postal/Zip code is required';
            default:
                return '';
        }
    };

    const validateDateOfBirthField = (
        field: keyof DOB,
        value: string,
    ): string => {
        if (!value) return 'Date of Birth is required';

        switch (field) {
            case 'day':
                return !isNaN(Number(value)) &&
                    Number(value) >= 1 &&
                    Number(value) <= 31
                    ? ''
                    : 'Invalid day';
            case 'month':
                return !isNaN(Number(value)) &&
                    Number(value) >= 1 &&
                    Number(value) <= 12
                    ? ''
                    : 'Invalid month';
            case 'year':
                const currentYear = new Date().getFullYear();
                const yearNum = Number(value);
                return !isNaN(yearNum) &&
                    yearNum >= currentYear - 120 &&
                    yearNum <= currentYear - 18
                    ? ''
                    : `Year must be between ${currentYear - 120} and ${currentYear - 18}`;
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {
            address: {},
            dateOfBirth: {},
        };

        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key as keyof Address, value);
            if (error) {
                newErrors.address[key as keyof Address] = error;
            }
        });

        Object.entries(dateOfBirth).forEach(([key, value]) => {
            const error = validateDateOfBirthField(key as keyof DOB, value);
            if (error) {
                newErrors.dateOfBirth[key as keyof DOB] = error;
            }
        });

        setErrors(newErrors);

        return (
            Object.values(newErrors.address).every((error) => !error) &&
            Object.values(newErrors.dateOfBirth).every((error) => !error)
        );
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const user = await handleRegisterUser({
                    fullname: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    dob: `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`,
                    phone: formData.phoneNumber,
                    address: formData.address1,
                    city: formData.city,
                    postcode: formData.postalCode,
                    roles: [],
                });

                if (user && user.id) {
                    navigate('/account/check-your-email', {
                        state: { userId: user.id }
                    });
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        address: {
                            ...prevErrors.address,
                            email: 'Registration failed. Please try again.',
                        },
                    }));
                }
            } catch (error: any) {
                if (
                    error.message.includes(
                        'An account with this email already exists',
                    )
                ) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        address: {
                            ...prevErrors.address,
                            email: 'An account with this email already exists',
                        },
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        address: {
                            ...prevErrors.address,
                            email: 'Registration failed. Please try again.',
                        },
                    }));
                }
            }
        } else {
            console.error('Form validation failed');
        }
    };

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
                                    value={formData.fullName}
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
                                    value={formData.email}
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
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    showToggle
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
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    showToggle
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
                                    value={formData.phoneNumber}
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
                                    value={formData.address1}
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
                                {errors.address.city && (
                                    <StyledParagraph>
                                        {errors.address.city}
                                    </StyledParagraph>
                                )}

                                <label>Postal / Zip code</label>
                                <Input
                                    variant="secondary"
                                    name="postalCode"
                                    value={formData.postalCode}
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
                                {loading && <p>Loading...</p>}
                                {error && (
                                    <StyledParagraph>
                                        Error: {error}
                                    </StyledParagraph>
                                )}
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
