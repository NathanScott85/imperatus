import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { Modal } from '../../../../../components/modal';
import { useBrandsContext } from '../../../../../context/brands';

export interface BrandDetailProps {
  brand: any;
  onBack: () => void;
}

export const Brand: React.FC<BrandDetailProps> = ( { brand, onBack } ) => {
  const { updateBrand, deleteBrand } = useBrandsContext();
  const [name, setName] = useState( brand.name );
  const [description, setDescription] = useState( brand.description );
  const [selectedFile, setSelectedFile] = useState<File | null>( null );
  const [previewUrl, setPreviewUrl] = useState<string | null>( null );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );
  const [isUpdating, setIsUpdating] = useState( false );
  const [isDeleting, setIsDeleting] = useState( false );
  const [isModalVisible, setIsModalVisible] = useState( false );
  const [confirmationText, setConfirmationText] = useState( '' );
  const fileInputRef = useRef<HTMLInputElement | null>( null );

  useEffect( () => {
    if ( selectedFile ) {
      const objectUrl = URL.createObjectURL( selectedFile );
      setPreviewUrl( objectUrl );
      return () => URL.revokeObjectURL( objectUrl );
    }
  }, [selectedFile] );

  const handleNameChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setName( e.target.value );
  };

  const handleDescriptionChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setDescription( e.target.value );
  };

  const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files.length > 0 ) {
      setSelectedFile( e.target.files[0] );
    }
  };

  const clearFileInput = () => {
    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
    setSelectedFile( null );
    setPreviewUrl( null );
  };

  const handleUpdate = async () => {
    setError( '' );
    setSuccess( '' );
    setIsUpdating( true );

    if ( !name || !description ) {
      setError( 'Name and description are required.' );
      setIsUpdating( false );
      return;
    }

    try {
      await updateBrand( {
        id: brand.id,
        name,
        description,
        img: selectedFile || null,
      } );

      setSuccess( 'Brand updated successfully!' );
      clearFileInput();
    } catch ( err ) {
      setError( 'Failed to update brand.' );
    } finally {
      setIsUpdating( false );
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible( true );
    setError( '' );
    setSuccess( '' );
  };

  const handleCloseModal = () => {
    setIsModalVisible( false );
    setConfirmationText( '' );
    setError( '' );
    setSuccess( '' );
  };

  const handleDelete = async () => {
    if ( confirmationText !== 'DELETE' ) {
      setError( 'Please type "DELETE" to confirm' );
      return;
    }

    try {
      await deleteBrand( brand.id );
      setSuccess( 'Brand deleted successfully!' );
      handleCloseModal();
      onBack();
    } catch ( err ) {
      setError( 'Failed to delete brand.' );
    } finally {
      setIsDeleting( false );
    }
  };

  return (
    <BrandContainer>
      <FormTitle>Edit Brand</FormTitle>
      <BackButton onClick={onBack}>Back to Brands</BackButton>
      <BrandWrapper>
        <BrandDetailsWrapper>
          <FormGroup>
            <Label htmlFor="name">Brand Name</Label>
            <Input
              variant="secondary"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              variant="description"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              variant="secondary"
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </FormGroup>

          <ButtonContainer>
            <Button
              variant="primary"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Brand'}
            </Button>
          
               <Button
            variant="primary"
            onClick={handleOpenModal}
            disabled={isDeleting}
          >
            Delete Brand
          </Button>
          </ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

       
        </BrandDetailsWrapper>
        <ImagePreviewContainer>
          <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
          {previewUrl && (
            <ImagePreview src={previewUrl} alt="Image preview" />
          )}
          <br/>
            {selectedFile && (
              <Button
                variant="secondary"
                size="xsmall"
                onClick={clearFileInput}
              >
                Clear File
              </Button>
            )}
        </ImagePreviewContainer>

      </BrandWrapper>
      {isModalVisible && (
        <Modal
          title="Delete Brand"
          content="Are you sure you want to delete this brand? This action cannot be undone."
          label='To confirm this, type "DELETE"'
          confirmationText={confirmationText}
          errorMessage={error}
          successMessage={success}
          setConfirmationText={setConfirmationText}
          handleDeleteAccount={handleDelete}
          handleCloseModal={handleCloseModal}
        />
      )}
    </BrandContainer>
  );
};

const BrandContainer = styled.div`
  color: white;
  width: 100%;
`;

const BrandWrapper = styled.div`
  border: 1px solid #ac8fff;
  border-radius: 4px;
  background-color: #160d35;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const BrandDetailsWrapper = styled.div`
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

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  img {
    margin-bottom: 0.5rem;
  }
`;

const ImagePreviewTitle = styled.h2`
  font-family: Cinzel, serif;
  font-size: 18px;
  margin-bottom: 1rem;
  color: white;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ac8fff;
  border-radius: 4px;
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
