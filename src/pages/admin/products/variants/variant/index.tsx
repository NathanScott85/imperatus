import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { useAdminContext } from '../../../../../context/admin';

export interface VariantDetailProps {
  variant: {
    id: string;
    name: string;
  };
  onBack: () => void;
}

export const Variant: React.FC<VariantDetailProps> = ({ variant, onBack }) => {
  const { updateVariant } = useAdminContext();
  const [name, setName] = useState(variant.name);

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
      setError('Variant name is required.');
      setIsUpdating(false);
      return;
    }

    try {
      await updateVariant(Number(variant.id), name);
      setSuccess('Variant updated successfully!');
    } catch (err) {
      setError('Failed to update variant.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <VariantContainer>
      <FormTitle>Edit Variant</FormTitle>
      <BackButton onClick={onBack}>Back to Variants</BackButton>
      <VariantWrapper>
        <VariantDetailsWrapper>
          <FormGroup>
            <Label htmlFor="variantName">Variant Name</Label>
            <Input
              variant="secondary"
              id="variantName"
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
              {isUpdating ? 'Updating...' : 'Update Variant'}
            </Button>
          </ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </VariantDetailsWrapper>
      </VariantWrapper>
    </VariantContainer>
  );
};

const VariantContainer = styled.div`
    color: white;
    width: 100%;
`;

const VariantWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const VariantDetailsWrapper = styled.div`
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
