import React, { useState } from 'react';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import styled from 'styled-components';

export const GuestCheckout = () => {
    const [guest, setGuest] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { ...errors };
        let hasError = false;

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key as keyof typeof newErrors] = 'Required';
                hasError = true;
            }
        });

        setErrors(newErrors);
        if (!hasError) {
            console.log('Guest delivery info:', formData);
        }
    };

    if (!guest) {
        return (
            <FancyContainer variant="login" size="login">
                <IntroWrapper>
                    <h2>Checkout as Guest</h2>
                    <p>You can place your order without creating an account.</p>
                    <Button
                        label="Guest Checkout"
                        onClick={() => setGuest(true)}
                        variant="secondary"
                        size="small"
                    />
                </IntroWrapper>
            </FancyContainer>
        );
    }

    return (
        <>
            {!guest ? (
                <FancyContainer variant="login" size="login">
                    <IntroWrapper>
                        <h2>Checkout as Guest</h2>
                        <p>
                            You can place your order without creating an
                            account.
                        </p>
                        <Button
                            label="Continue as Guest"
                            onClick={() => setGuest(true)}
                            variant="primary"
                            size="small"
                        />
                    </IntroWrapper>
                </FancyContainer>
            ) : (
                <>
                    <FormCard>
                        <Form onSubmit={handleSubmit}>
                            <h3>Enter Details to checkout as Guest:</h3>
                            <FormContents>
                                <label>Full Name</label>
                                <Input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <StyledParagraph>
                                        {errors.fullName}
                                    </StyledParagraph>
                                )}

                                <label>Email</label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                {errors.email && (
                                    <StyledParagraph>
                                        {errors.email}
                                    </StyledParagraph>
                                )}

                                <label>Phone Number</label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <StyledParagraph>
                                        {errors.phone}
                                    </StyledParagraph>
                                )}

                                <label>Address</label>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your address"
                                />
                                {errors.address && (
                                    <StyledParagraph>
                                        {errors.address}
                                    </StyledParagraph>
                                )}

                                <label>City</label>
                                <Input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your city"
                                />
                                {errors.city && (
                                    <StyledParagraph>
                                        {errors.city}
                                    </StyledParagraph>
                                )}

                                <label>Postcode</label>
                                <Input
                                    name="postcode"
                                    value={formData.postcode}
                                    onChange={handleChange}
                                    variant="secondary"
                                    placeholder="Enter your postcode"
                                />
                                {errors.postcode && (
                                    <StyledParagraph>
                                        {errors.postcode}
                                    </StyledParagraph>
                                )}

                                <StyledFormWrapper>
                                    <Button
                                        label="Guest Checkout"
                                        variant="primary"
                                        size="small"
                                        type="submit"
                                    />
                                    <Button
                                        label="Cancel"
                                        variant="text"
                                        onClick={() => setGuest(false)}
                                    />
                                </StyledFormWrapper>
                            </FormContents>
                        </Form>
                    </FormCard>
                </>
            )}
        </>
    );
};

const FormCard = styled.div`
    display: flex;
    background-color: #130a30;
    border: 2px solid #4d3c7b;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    color: white;
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h3 {
        font-family: Cinzel, serif;
        color: #c79d0a;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
`;

const FormContents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    gap: 1rem;

    label {
        font-family: Cinzel, serif;
        font-size: 14px;
        color: #c79d0a;
        font-weight: bold;
        margin-bottom: 0.25rem;
    }
`;

const StyledFormWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 1rem;
`;

const StyledParagraph = styled.p`
    color: red;
    font-size: 10px;
    margin: 0.5rem 0 0 0;
`;

const IntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    h2 {
        font-family: Cinzel;
        font-size: 20px;
        color: #c79d0a;
    }
    p {
        color: white;
        font-size: 14px;
    }
`;
