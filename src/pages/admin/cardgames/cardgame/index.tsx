import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { useCardGamesContext } from '../../../../context/cardgames';

export interface CardGameDetailProps {
  cardGame: any;
  onBack: () => void;
}

export const CardGame: React.FC<CardGameDetailProps> = ( { cardGame, onBack } ) => {
  // const { updateCardGame, deleteCardGame } = useCardGamesContext();

  // Combined state management
  const [updateCardGameData, setUpdateCardGameData] = useState( {
    name: cardGame.name,
    description: cardGame.description,
    price: cardGame.price,
    rrp: cardGame.rrp,
    preorder: cardGame.preorder,
    stockAmount: cardGame.stock.amount,
    stockSold: cardGame.stock.sold,
    stockInstock: cardGame.stock.instock === 'In Stock',
    stockSoldout: cardGame.stock.soldout === 'Sold Out',
    selectedFile: null as File | null,
  } );

  const [previewUrl, setPreviewUrl] = useState<string | null>( null );
  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );
  const [isUpdating, setIsUpdating] = useState( false );
  const [isDeleting, setIsDeleting] = useState( false );
  const [isModalVisible, setIsModalVisible] = useState( false );
  const [confirmationText, setConfirmationText] = useState( '' );

  const fileInputRef = useRef<HTMLInputElement | null>( null );

  useEffect( () => {
    if ( updateCardGameData.selectedFile ) {
      const objectUrl = URL.createObjectURL( updateCardGameData.selectedFile );
      setPreviewUrl( objectUrl );
      return () => URL.revokeObjectURL( objectUrl ); // Cleanup
    }
  }, [updateCardGameData.selectedFile] );

  // Unified input change handler
  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { id, value, type, checked } = e.target;
    setUpdateCardGameData( ( prevState ) => ( {
      ...prevState,
      [id]: type === 'checkbox' ? checked : value,
    } ) );
  };

  const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target?.files?.[0];
    if ( file ) {
      setUpdateCardGameData( ( prevState ) => ( {
        ...prevState,
        selectedFile: file,
      } ) );
    }
  };

  const clearFileInput = () => {
    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
    setUpdateCardGameData( ( prevState ) => ( {
      ...prevState,
      selectedFile: null,
    } ) );
    setPreviewUrl( null );
  };

  const handleUpdate = async () => {
    setError( '' );
    setSuccess( '' );
    setIsUpdating( true );

    const {
      name,
      description,
      price,
      rrp,
      preorder,
      selectedFile,
      stockAmount,
      stockSold,
      stockInstock,
      stockSoldout,
    } = updateCardGameData;

    if ( !name || !description || price == null ) {
      setError( 'Name, description, and price are required.' );
      setIsUpdating( false );
      return;
    }

    try {
      const categoryId = parseInt( cardGame.category.id, 10 );

      // await updateCardGame( {
      //   id: cardGame.id,
      //   name,
      //   description,
      //   price: parseFloat( price ),
      //   rrp: rrp ? parseFloat( rrp ) : undefined,
      //   preorder,
      //   img: selectedFile || undefined,
      //   categoryId,
      //   stock: {
      //     amount: parseInt( stockAmount ),
      //     sold: parseInt( stockSold ),
      //     instock: stockInstock ? 'In Stock' : 'Not In Stock',
      //     soldout: stockSoldout ? 'Sold Out' : 'Not Sold Out',
      //   },
      // } );

      setSuccess( 'Card game updated successfully!' );
      clearFileInput();
    } catch ( err ) {
      setError( 'Failed to update card game.' );
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
      // await deleteCardGame( cardGame.id );
      setSuccess( 'Card game deleted successfully!' );
      handleCloseModal();
      onBack();
    } catch ( err ) {
      setError( 'Failed to delete card game.' );
    } finally {
      setIsDeleting( false );
    }
  };

  return (
    <CardGameContainer>
      <FormTitle>Edit Card Game</FormTitle>
      <BackButton onClick={onBack}>Back to Card Games</BackButton>
      <CardGameWrapper>
        <CardGameDetailsWrapper>
          <strong>Name:</strong>
          <CardGameDetail>{cardGame.name}</CardGameDetail>
          <strong>Description:</strong>
          <CardGameDetail>{cardGame.description}</CardGameDetail>
          <strong>Price:</strong>
          <CardGameDetail>£{cardGame.price.toFixed( 2 )}</CardGameDetail>
          <strong>RRP:</strong>
          <CardGameDetail>£{cardGame.rrp?.toFixed( 2 ) || 'N/A'}</CardGameDetail>
          <strong>Stock Amount:</strong>
          <CardGameDetail>{cardGame.stock.amount}</CardGameDetail>
          <strong>Stock Sold:</strong>
          <CardGameDetail>{cardGame.stock.sold}</CardGameDetail>
          <strong>Status:</strong>
          <CardGameDetail>
            {cardGame.stock.amount > 0 ? 'In Stock' : 'Sold Out'}
          </CardGameDetail>
          <strong>Preorder:</strong>
          <CardGameDetail>{cardGame.preorder ? 'Yes' : 'No'}</CardGameDetail>
        </CardGameDetailsWrapper>

        <FormWrapper>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">Card Game Name</Label>
              <Input
                variant="secondary"
                id="name"
                value={updateCardGameData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                variant="description"
                id="description"
                value={updateCardGameData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price (£)</Label>
              <Input
                variant="birthday"
                id="price"
                type="number"
                value={updateCardGameData.price.toFixed( 2 )}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="rrp">RRP (£)</Label>
              <Input
                variant="birthday"
                id="rrp"
                type="number"
                value={updateCardGameData.rrp?.toFixed( 2 ) || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              variant="secondary"
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {updateCardGameData.selectedFile && (
              <Button
                variant="secondary"
                size="xsmall"
                onClick={clearFileInput}
              >
                Clear File
              </Button>
            )}
          </FormGroup>

          <ButtonContainer>
            <Button
              variant="primary"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Card Game'}
            </Button>
            <Button
              variant="primary"
              onClick={handleOpenModal}
              disabled={isDeleting}
            >
              Delete Card Game
            </Button>
          </ButtonContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </FormWrapper>

        <ImagePreviewContainer>
          <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
          {previewUrl && (
            <ImagePreview src={previewUrl} alt="Image preview" />
          )}
        </ImagePreviewContainer>
      </CardGameWrapper>

      {isModalVisible && (
        <Modal
          title="Delete Card Game"
          content="Are you sure you want to delete this card game? This action cannot be undone."
          label='To confirm, type "DELETE"'
          confirmationText={confirmationText}
          errorMessage={error}
          successMessage={success}
          setConfirmationText={setConfirmationText}
          handleDeleteAccount={handleDelete}
          handleCloseModal={handleCloseModal}
        />
      )}
    </CardGameContainer>
  );
};

// Styled components

const CardGameContainer = styled.div`
    color: white;
`;

const CardGameWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const CardGameDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 2rem;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
    }
    width: 327px;
`;

const CardGameDetail = styled.p`
    font-family: Barlow;
    font-size: 14px;
    color: white;
    padding-bottom: 0.5rem;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const FormGroup = styled.div`
    flex: 1;
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
