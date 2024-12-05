import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';

export const AddProductType = () => {
  const [productType, setProductType] = useState( { name: '' } );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );
  const [isButtonDisabled, setIsButtonDisabled] = useState( false );

  const { createProductType } = useAdminContext();

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { id, value } = e.target;
    setProductType( { ...productType, [id]: value } );
    setIsButtonDisabled( false );
  };

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( '' );
    setSuccess( '' );
    setIsButtonDisabled( true );

    const { name } = productType;

    if ( !name ) {
      setError( 'Product Type Name is required.' );
      setIsButtonDisabled( false );
      return;
    }

    try {
      const { success, message } = await createProductType( {
        name, // Ensure to use 'input' for the mutation
      } );

      if ( success ) {
        setSuccess( message );
        setProductType( { name: '' } ); // Reset the form
      } else {
        setError( message );
      }
    } catch ( err ) {
      setError( 'An unexpected error occurred.' );
    } finally {
      setIsButtonDisabled( false );
    }
  };

  return (
    <ProductTypeContainer>
      <ProductTypeTitle>Add New Product Type</ProductTypeTitle>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Product Type Name</Label>
            <Input
              variant="secondary"
              type="text"
              id="name"
              value={productType.name}
              onChange={handleInputChange}
              required
            />
            <ButtonContainer>
              <Button
                variant="primary"
                type="submit"
                disabled={!productType.name || isButtonDisabled}
              >
                {isButtonDisabled ? 'Adding...' : 'Add Product Type'}
              </Button>
            </ButtonContainer>
          </FormGroup>
        </Form>
      </FormContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </ProductTypeContainer>
  );
};

const ProductTypeContainer = styled.div`
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

const ProductTypeTitle = styled.h2`
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
