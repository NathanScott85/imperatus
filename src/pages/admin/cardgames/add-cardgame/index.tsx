import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useCardGamesContext } from '../../../../context/cardgames';

export const AddCardGame = () => {
  const { createCardGame } = useCardGamesContext(); // Use context

  const [name, setName] = useState( '' );
  const [description, setDescription] = useState( '' );
  const [img, setImg] = useState<File | null>( null );
  const [previewUrl, setPreviewUrl] = useState<string | null>( null );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );
  const [isButtonDisabled, setIsButtonDisabled] = useState( false );

  const fileInputRef = useRef<HTMLInputElement | null>( null );

  const clearFileInput = () => {
    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
    setImg( null );
    setPreviewUrl( null );
  };

  const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files.length > 0 ) {
      const file = e.target.files[0];
      setImg( file );
      const objectUrl = URL.createObjectURL( file );
      setPreviewUrl( objectUrl );
    }
    setIsButtonDisabled( false );
  };

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( '' );
    setSuccess( '' );
    setIsButtonDisabled( true );

    if ( !name || !description || !img ) {
      setError( 'All fields are required, including an image.' );
      setIsButtonDisabled( false );
      return;
    }

    try {
      await createCardGame( {
        name,
        description,
        img, // File passed here
        categoryId: 1, // Replace with appropriate category ID
      } );
      setSuccess( 'Card game added successfully!' );
      clearFileInput();
      setName( '' );
      setDescription( '' );
    } catch ( error ) {
      console.error( 'Error adding card game:', error );
      setError( 'Failed to add card game. Please try again.' );
    } finally {
      setIsButtonDisabled( false );
    }
  };

  return (
    <CardGameContainer>
      <CardGameTitle>Add New Card Game</CardGameTitle>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormWrapper>
            <FormGroup>
              <Label htmlFor="name">Card Game Name</Label>
              <Input
                variant="secondary"
                type="text"
                id="name"
                value={name}
                onChange={( e ) => setName( e.target.value )}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                variant="description"
                id="description"
                value={description}
                onChange={( e ) => setDescription( e.target.value )}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                variant="secondary"
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
              />
            </FormGroup>
            <ButtonContainer>
              <Button
                variant="primary"
                type="submit"
                disabled={!name || !description || !img || isButtonDisabled}
              >
                {isButtonDisabled ? 'Adding...' : 'Add Card Game'}
              </Button>
            </ButtonContainer>
          </FormWrapper>
        </Form>
        <ImagePreviewContainer>
          <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
          {previewUrl && <ImagePreview src={previewUrl} alt="Image preview" />}
        </ImagePreviewContainer>
      </FormContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </CardGameContainer>
  );
};

// Styled Components

const CardGameContainer = styled.div`
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardGameTitle = styled.h2`
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

const ImagePreviewContainer = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreviewTitle = styled.h3`
  font-family: Cinzel, serif;
  font-size: 20px;
  margin-bottom: 1rem;
  color: white;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 300px;
  border-radius: 8px;
  border: 2px solid #4d3c7b;
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: Barlow, sans-serif;
  font-size: 14px;
  margin-top: 1rem;
  max-width: 75%;
`;

const SuccessMessage = styled.p`
  color: green;
  font-family: Barlow, sans-serif;
  font-size: 14px;
  margin-top: 1rem;
`;
