import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useShippingContext } from '../../../../context/shipping';
import { Checkbox } from '../../../../components/checkbox';

export interface ShippingOptionDetailProps {
    option: {
        id: number;
        name: string;
        cost: number;
        estimatedDays: number;
        description?: string;
        isActive: boolean;
        provider: { id: number; name: string };
    };
    onBack: () => void;
}

export const ShippingOptionDetail: React.FC<ShippingOptionDetailProps> = ({
    option,
    onBack,
}) => {
    const { updateShippingOption } = useShippingContext();

    const [name, setName] = useState(option.name);
    const [cost, setCost] = useState(option.cost.toString());
    const [estimatedDays, setEstimatedDays] = useState(
        option.estimatedDays.toString(),
    );
    const [description, setDescription] = useState(option.description || '');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        const result = await updateShippingOption({
            id: option.id,
            name,
            cost: parseFloat(cost),
            estimatedDays: parseInt(estimatedDays),
            description,
        });

        if (result.success) {
            setSuccess('Shipping option updated successfully.');
        } else {
            setError(result.message || 'Update failed.');
        }

        setLoading(false);
    };

    return (
        <OptionContainer>
            <FormTitle>Edit Shipping Option</FormTitle>
            <BackButton onClick={onBack}>Back to Options</BackButton>
            <OptionWrapper>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        variant="secondary"
                        placeholder="Enter shipping option name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Cost</Label>
                    <Input
                        variant="secondary"
                        type="number"
                        placeholder="Enter cost in GBP"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Estimated Days</Label>
                    <Input
                        variant="secondary"
                        type="number"
                        placeholder="Enter estimated days"
                        value={estimatedDays}
                        onChange={(e) => setEstimatedDays(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        variant="description"
                        placeholder="Enter a brief description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <Button
                    variant="primary"
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Shipping Option'}
                </Button>
                {success && <Success>{success}</Success>}
                {error && <Error>{error}</Error>}
            </OptionWrapper>
        </OptionContainer>
    );
};

const OptionContainer = styled.div`
    color: white;
    width: 100%;
`;

const OptionWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow;
    font-size: 14px;
    display: block;
    margin-bottom: 0.5rem;
`;

const Toggle = styled.input`
    margin-right: 0.5rem;
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

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const Success = styled.p`
    color: green;
    font-family: Barlow;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 14px;
`;

const Error = styled.p`
    color: #e74c3c;
    font-family: Barlow;
    margin-top: 1rem;
`;
