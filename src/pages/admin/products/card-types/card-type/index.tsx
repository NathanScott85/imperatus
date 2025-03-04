import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { useAdminContext } from '../../../../../context/admin';
import { useBrandsContext } from '../../../../../context/brands';

export interface CardTypeDetailProps {
    type: {
        id: number;
        name: string;
        brand: {
            id: string;
            name: string;
        };
    };
    onBack: () => void;
}

export const CardType: React.FC<CardTypeDetailProps> = ({ type, onBack }) => {
    const { updateCardType } = useAdminContext();
    const { brands } = useBrandsContext();

    const [name, setName] = useState(type.name);
    const [selectedBrand, setSelectedBrand] = useState<number>(Number(type.brand.id)); // Extract brand ID
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBrand(Number(e.target.value));
    };

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!name || !selectedBrand) {
            setError('Both name and brand are required.');
            setIsUpdating(false);
            return;
        }

        try {
            await updateCardType({ id: Number(type.id), name, brandId: Number(selectedBrand) });
            setSuccess('Card Type updated successfully!');
        } catch (err) {
            setError('Failed to update Card Type.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <CardTypeContainer>
            <FormTitle>Edit Card Type</FormTitle>
            <BackButton onClick={onBack}>Back to Card Types</BackButton>
            <CardTypeWrapper>
                <CardTypeDetailsWrapper>
                    <FormGroup>
                        <Label htmlFor="name">Card Type Name</Label>
                        <Input
                            variant="secondary"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="brand">Select Brand</Label>
                        <Select id="brand" value={selectedBrand} onChange={handleBrandChange}>
                            <option value="">Select a Brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>

                    <ButtonContainer>
                        <Button variant="primary" onClick={handleUpdate} disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update Card Type'}
                        </Button>
                    </ButtonContainer>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </CardTypeDetailsWrapper>
            </CardTypeWrapper>
        </CardTypeContainer>
    );
};

const CardTypeContainer = styled.div`
  color: white;
  width: 100%;
`;

const CardTypeWrapper = styled.div`
  border: 1px solid #ac8fff;
  border-radius: 4px;
  background-color: #160d35;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const CardTypeDetailsWrapper = styled.div`
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

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 14px;
  font-family: Barlow, sans-serif;
  background-color: #2a1f51;
  color: white;
  border: 1px solid #4d3c7b;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #c79d0a;
  }
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
