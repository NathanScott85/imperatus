import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { useAdminContext } from '../../../../../context/admin';

export interface TypeDetailProps {
    type: {
        id: number;
        name: string;
    };
    onBack: () => void;
}

export const TypeDetail: React.FC<TypeDetailProps> = ({ type, onBack }) => {
    const { updateProductType } = useAdminContext();
    const [name, setName] = useState(type.name);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!name) {
            setError('Product type name is required.');
            setIsUpdating(false);
            return;
        }

        try {
            await updateProductType(Number(type.id), name);
            setSuccess('Product type updated successfully!');
        } catch (err) {
            setError('Failed to update product type.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <TypeDetailContainer>
            <FormTitle>Edit Product Type</FormTitle>
            <BackButton onClick={onBack}>Back to Product Types</BackButton>
            <TypeWrapper>
                <TypeDetailsWrapper>
                    <FormGroup>
                        <Label htmlFor="name">Product Type Name</Label>
                        <Input
                            variant="secondary"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormGroup>
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            onClick={handleUpdate}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Product Type'}
                        </Button>
                    </ButtonContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </TypeDetailsWrapper>
            </TypeWrapper>
        </TypeDetailContainer>
    );
};

const TypeDetailContainer = styled.div`
    color: white;
    width: 100%;
`;

const TypeWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const TypeDetailsWrapper = styled.div`
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
    color: #c79d0a;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
