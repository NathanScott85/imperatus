import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useBrandsContext } from '../../../../context/brands';

export const AddBrand = () => {
  const [brand, setBrand] = useState( { name: '', description: '', selectedFile: null as File | null } );
  const [previewUrl, setPreviewUrl] = useState<string | null>( null );
  const [isButtonDisabled, setIsButtonDisabled] = useState( false );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );

  const { createProductBrand } = useBrandsContext();
  const fileInputRef = useRef<HTMLInputElement | null>( null );

  const clearFileInput = () => {
    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
    setBrand( ( prev ) => ( { ...prev, selectedFile: null } ) );
    setPreviewUrl( null );
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { id, value } = e.target;
    setBrand( ( prev ) => ( { ...prev, [id]: value } ) );
  };

  const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files.length > 0 ) {
      const file = e.target.files[0];
      setBrand( ( prev ) => ( { ...prev, selectedFile: file } ) );
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

    const { name, description, selectedFile } = brand;

    if ( !name || !description || !selectedFile ) {
      setError( 'Brand Name, Description, and an Image are required.' );
      setIsButtonDisabled( false );
      return;
    }

    try {
      const result = await createProductBrand( name, description, selectedFile );

      if ( result.success ) {
        setSuccess( 'Brand added successfully!' );
        clearFileInput();
        setBrand( { name: '', description: '', selectedFile: null } );
      } else {
        setError( result.message || 'Failed to add brand.' );
      }
    } catch ( err ) {
      setError( 'An unexpected error occurred.' );
    } finally {
      setIsButtonDisabled( false );
    }
  };

  return (
    <BrandContainer>
      <BrandTitle>Add Brand</BrandTitle>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormWrapper>
            <FormGroup>
              <Label>Brand Name</Label>
              <Input
                variant="secondary"
                type="text"
                id="name"
                value={brand.name}
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
                value={brand.description}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Upload Image</Label>
              <Input
                variant="secondary"
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                required
              />
            </FormGroup>
            <ButtonContainer>
              <Button
                variant="primary"
                type="submit"
                disabled={!brand.name || !brand.description || isButtonDisabled}
              >
                {isButtonDisabled ? 'Adding...' : 'Add Brand'}
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
    </BrandContainer>
  );
};

const BrandContainer = styled.div`
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

const BrandTitle = styled.h2`
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
`;

const SuccessMessage = styled.p`
  color: green;
  font-family: Barlow, sans-serif;
  font-size: 14px;
  margin-top: 1rem;
`;
