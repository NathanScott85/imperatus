import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useShippingContext } from '../../../../context/shipping';

export const AddShippingProvider = () => {
    const [provider, setProvider] = useState({ name: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { createShippingProvider } = useShippingContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProvider((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const { name } = provider;

        if (!name) {
            setError('Provider name is required.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const result = await createShippingProvider({ name });

            if (result.success) {
                setSuccess('Provider added successfully!');
                setProvider({ name: '' });
            } else {
                setError(result.message || 'Failed to add provider.');
            }
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <ProviderContainer>
            <ProviderTitle>Add Shipping Provider</ProviderTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label>Provider Name</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="name"
                                value={provider.name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <ButtonContainer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!provider.name || isButtonDisabled}
                            >
                                {isButtonDisabled
                                    ? 'Adding...'
                                    : 'Add Provider'}
                            </Button>
                        </ButtonContainer>
                    </FormWrapper>
                </Form>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </ProviderContainer>
    );
};

const ProviderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    background-color: #160d35;
    color: white;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const ProviderTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;

const SuccessMessage = styled.p`
    color: green;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;
