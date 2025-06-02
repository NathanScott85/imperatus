import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useShippingContext } from '../../../../context/shipping';

export interface ProviderDetailProps {
    provider: { id: number; name: string };
    onBack: () => void;
}

export const ShippingProviderDetail: React.FC<ProviderDetailProps> = ({
    provider,
    onBack,
}) => {
    const { updateShippingProvider } = useShippingContext();
    const [name, setName] = useState(provider.name);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!name.trim()) {
            setError('Name is required.');
            setIsUpdating(false);
            return;
        }

        const result = await updateShippingProvider({ id: provider.id, name });

        if (result.success) {
            setSuccess('Shipping provider updated successfully.');
        } else {
            setError(result.message || 'Update failed.');
        }

        setIsUpdating(false);
    };

    return (
        <ProviderContainer>
            <FormTitle>Edit Shipping Provider</FormTitle>
            <BackButton onClick={onBack}>Back to Providers</BackButton>
            <ProviderWrapper>
                <ProviderDetailsWrapper>
                    <FormGroup>
                        <Label htmlFor="name">Provider Name</Label>
                        <Input
                            variant="secondary"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            onClick={handleUpdate}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Provider'}
                        </Button>
                    </ButtonContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </ProviderDetailsWrapper>
            </ProviderWrapper>
        </ProviderContainer>
    );
};

const ProviderContainer = styled.div`
    color: white;
    width: 100%;
`;

const ProviderWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const ProviderDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 0.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
`;

const BackButton = styled.button`
    background-color: #4d3c7b;
    color: #fff;
    border: none;
    margin-bottom: 1.5rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    padding: 0.75rem;
    &:hover {
        background-color: #2a1f51;
    }
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    font-size: 16px;
    font-family: Barlow;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 16px;
    font-family: Barlow;
`;

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;
