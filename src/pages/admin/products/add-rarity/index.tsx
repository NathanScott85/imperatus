import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useAdminContext } from '../../../../context/admin';

export const AddRarity = () => {
    const [rarity, setRarity] = useState({ name: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { createRarity } = useAdminContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRarity((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const { name } = rarity;

        if (!name) {
            setError('Rarity Name is required.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const result = await createRarity({ name });

            if (result.success) {
                setSuccess('Rarity added successfully!');
                setRarity({ name: '' });
            } else {
                setError(result.message || 'Failed to add rarity.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <RarityContainer>
            <RarityTitle>Add Rarity</RarityTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label>Rarity Name</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="name"
                                value={rarity.name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <ButtonContainer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!rarity.name || isButtonDisabled}
                            >
                                {isButtonDisabled ? 'Adding...' : 'Add Rarity'}
                            </Button>
                        </ButtonContainer>
                    </FormWrapper>
                </Form>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </RarityContainer>
    );
};

const RarityContainer = styled.div`
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

const RarityTitle = styled.h2`
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

