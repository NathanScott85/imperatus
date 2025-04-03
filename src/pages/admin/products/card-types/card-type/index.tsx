import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { useBrandsContext } from '../../../../../context/brands';
import { ProductDropdown } from '../../add-product/dropdown'; // Ensure correct import path
import { useCardTypesContext } from '../../../../../context/card-types';

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
    const { updateCardType } = useCardTypesContext();
    const { brands } = useBrandsContext();

    const [name, setName] = useState(type.name);
    const [selectedBrand, setSelectedBrand] = useState<number>(Number(type.brand.id));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleDropdownChange = (_selectedValue: string, value: string) => {
        setSelectedBrand(Number(value));
        setIsDropdownOpen(false);
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
                        <ProductDropdown
                            label="Select Brand"
                            handleDropdownToggle={handleDropdownToggle}
                            handleDropdownChange={handleDropdownChange}
                            toggleValue="brand"
                            isDropdownOpen={isDropdownOpen}
                            header={
                                selectedBrand
                                    ? brands.find((b) => Number(b.id) === Number(selectedBrand))?.name
                                    : 'Select a brand'
                            }
                            values={brands}
                            selectedValue={selectedBrand}
                            displayField="name"
                        />
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
