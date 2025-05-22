import { CardElement } from '@stripe/react-stripe-js';
import React, { FormEvent, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { Input } from '../../input';

interface StripeFormProps {
    initialData: {
        name: string;
        email: string;
        address: string;
        city: string;
        postcode: string;
        phone: string;
    };
    onSubmit: (billing: StripeFormProps['initialData']) => void;
    error: string | null;
    loading: boolean;
}

export const Stripe = forwardRef<HTMLFormElement, StripeFormProps>(
    ({ initialData, onSubmit, error }, ref) => {
        const [formData, setFormData] = useState(initialData);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        };

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            onSubmit(formData);
        };

        return (
            <Form ref={ref} onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        variant="secondary"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        variant="secondary"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        variant="secondary"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        variant="secondary"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        variant="secondary"
                        name="postcode"
                        placeholder="Postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        variant="secondary"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <CardWrapper>
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontFamily: 'Barlow, sans-serif',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    iconColor: '#ffffff',
                                    '::placeholder': {
                                        color: '#ac8fff',
                                    },
                                },
                                invalid: {
                                    color: '#ff4d4f',
                                    iconColor: '#ff4d4f',
                                },
                            },
                        }}
                    />
                </CardWrapper>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                <button type="submit" style={{ display: 'none' }} />
            </Form>
        );
    },
);

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 100%;
`;

const InputGroup = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

const CardWrapper = styled.div`
    background-color: transparent;
    border: 1px solid #ac8fff;
    border-radius: 4px;
    padding: 1rem;
    font-family: Barlow, sans-serif;
    color: white;
`;

const ErrorMessage = styled.div`
    color: #ff4d4f;
    margin-top: 10px;
    font-weight: bold;
`;
