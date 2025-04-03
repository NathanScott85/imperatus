import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useVariantsContext } from '../../../../context/variants';

export const AddVariant = () => {
  const [variant, setVariant] = useState({ name: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { createVariant } = useVariantsContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setVariant((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsButtonDisabled(true);

    if (!variant.name) {
      setError('Variant Name is required.');
      setIsButtonDisabled(false);
      return;
    }

    try {
      const result = await createVariant(variant.name);

      if (result.success) {
        setSuccess('Variant added successfully!');
        setVariant({ name: '' });
      } else {
        setError(result.message || 'Failed to add variant.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <VariantContainer>
      <VariantTitle>Add Variant</VariantTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Variant Name</Label>
          <Input
            variant="secondary"
            type="text"
            id="name"
            value={variant.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <ButtonContainer>
          <Button
            variant="primary"
            type="submit"
            disabled={!variant.name || isButtonDisabled}
          >
            {isButtonDisabled ? 'Adding...' : 'Add Variant'}
          </Button>
        </ButtonContainer>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </VariantContainer>
  );
};

const VariantContainer = styled.div`
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

const VariantTitle = styled.h2`
  font-family: Cinzel, serif;
  font-size: 24px;
  margin-bottom: 1rem;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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
