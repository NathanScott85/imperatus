import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useSetsContext } from '../../../../context/sets';

export const AddSet = () => {
  const [setData, setSetData] = useState( {
    setName: '',
    setCode: '',
    description: '',
  } );
  const [isButtonDisabled, setIsButtonDisabled] = useState( false );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );

  const { createSet } = useSetsContext();

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { id, value } = e.target;
    setSetData( ( prev ) => ( { ...prev, [id]: value } ) );
  };

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( '' );
    setSuccess( '' );
    setIsButtonDisabled( true );

    const { setName, setCode, description } = setData;

    if ( !setName || !setCode || !description ) {
      setError( 'Set Name, Set Code, and Description are required.' );
      setIsButtonDisabled( false );
      return;
    }

    try {
      const result = await createSet( setName, setCode, description );

      if ( result.success ) {
        setSuccess( 'Set added successfully!' );
        setSetData( { setName: '', setCode: '', description: '' } );
      } else {
        setError( result.message || 'Failed to add set.' );
      }
    } catch ( err ) {
      setError( 'An unexpected error occurred.' );
    } finally {
      setIsButtonDisabled( false );
    }
  };

  return (
    <SetContainer>
      <SetTitle>Add Set</SetTitle>
      <Form onSubmit={handleSubmit}>
        <FormWrapper>
          <FormGroup>
            <Label>Set Name</Label>
            <Input
              variant="secondary"
              type="text"
              id="setName"
              value={setData.setName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Set Code</Label>
            <Input
              variant="secondary"
              type="text"
              id="setCode"
              value={setData.setCode}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              variant="description"
              type="text"
              id="description"
              value={setData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <ButtonContainer>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !setData.setName ||
                !setData.setCode ||
                !setData.description ||
                isButtonDisabled
              }
            >
              {isButtonDisabled ? 'Adding...' : 'Add Set'}
            </Button>
          </ButtonContainer>
        </FormWrapper>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </SetContainer>
  );
};

const SetContainer = styled.div`
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

const SetTitle = styled.h2`
  font-family: Cinzel, serif;
  font-size: 24px;
  margin-bottom: 1rem;
  color: white;
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
