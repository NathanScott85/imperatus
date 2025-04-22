import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useOrdersContext } from '../../../../context/orders';

export const AddOrderStatus = () => {
    const [status, setStatus] = useState({ value: '', label: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { createStatus } = useOrdersContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setStatus((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const { value, label } = status;

        if (!value || !label) {
            setError('Both value and label are required.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const result = await createStatus(value, label);

            if (result.success) {
                setSuccess('Order status added successfully!');
                setStatus({ value: '', label: '' });
            } else {
                setError(result.message || 'Failed to add order status.');
            }
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <StatusContainer>
            <StatusTitle>Add Order Status</StatusTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label>Status Value</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="value"
                                value={status.value}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status Label</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="label"
                                value={status.label}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <ButtonContainer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={
                                    !status.value ||
                                    !status.label ||
                                    isButtonDisabled
                                }
                            >
                                {isButtonDisabled ? 'Adding...' : 'Add Status'}
                            </Button>
                        </ButtonContainer>
                    </FormWrapper>
                </Form>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </StatusContainer>
    );
};

const StatusContainer = styled.div`
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

const StatusTitle = styled.h2`
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
