import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { Modal } from '../../../../../components/modal';
import { useSetsContext } from '../../../../../context/sets';

export interface SetDetailProps {
  set: {
    id: string;
    setName: string;
    setCode: string;
    description: string;
  };
  onBack: () => void;
}

export const Set: React.FC<SetDetailProps> = ( { set, onBack } ) => {
  const { updateSet, deleteSet } = useSetsContext();
  const [setName, setSetName] = useState( set.setName );
  const [setCode, setSetCode] = useState( set.setCode );
  const [description, setDescription] = useState( set.description );

  const [error, setError] = useState( '' );
  const [success, setSuccess] = useState( '' );
  const [isUpdating, setIsUpdating] = useState( false );
  const [isDeleting, setIsDeleting] = useState( false );
  const [isModalVisible, setIsModalVisible] = useState( false );
  const [confirmationText, setConfirmationText] = useState( '' );

  const handleSetNameChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setSetName( e.target.value );
  };

  const handleSetCodeChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setSetCode( e.target.value );
  };

  const handleDescriptionChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setDescription( e.target.value );
  };

  const handleUpdate = async () => {
    setError( '' );
    setSuccess( '' );
    setIsUpdating( true );

    if ( !setName || !setCode || !description ) {
      setError( 'Set Name, Set Code, and description are required.' );
      setIsUpdating( false );
      return;
    }

    try {
      await updateSet( {
        id: set.id,
        setName,
        setCode,
        description,
      } );

      setSuccess( 'Set updated successfully!' );
    } catch ( err ) {
      setError( 'Failed to update set.' );
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

    setIsDeleting( true );
    try {
      await deleteSet( set.id );
      setSuccess( 'Set deleted successfully!' );
      handleCloseModal();
      onBack();
    } catch ( err ) {
      setError( 'Failed to delete set.' );
    } finally {
      setIsDeleting( false );
    }
  };

  return (
    <SetContainer>
      <FormTitle>Edit Set</FormTitle>
      <BackButton onClick={onBack}>Back to Sets</BackButton>
      <SetWrapper>
        <SetDetailsWrapper>
          <FormGroup>
            <Label htmlFor="setName">Set Name</Label>
            <Input
              variant="secondary"
              id="setName"
              value={setName}
              onChange={handleSetNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="setCode">Set Code</Label>
            <Input
              variant="secondary"
              id="setCode"
              value={setCode}
              onChange={handleSetCodeChange}
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

          <ButtonContainer>
            <Button
              variant="primary"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Set'}
            </Button>
            <Button
            variant="primary"
            onClick={handleOpenModal}
            disabled={isDeleting}
          >
            Delete Set
          </Button>
          </ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}         
        </SetDetailsWrapper>
      </SetWrapper>
      {isModalVisible && (
        <Modal
          title="Delete Set"
          content="Are you sure you want to delete this set? This action cannot be undone."
          label='To confirm this, type "DELETE"'
          confirmationText={confirmationText}
          errorMessage={error}
          successMessage={success}
          setConfirmationText={setConfirmationText}
          handleDeleteAccount={handleDelete}
          handleCloseModal={handleCloseModal}
        />
      )}
    </SetContainer>
  );
};

const SetContainer = styled.div`
  color: white;
  width: 100%;
`;

const SetWrapper = styled.div`
  border: 1px solid #ac8fff;
  border-radius: 4px;
  background-color: #160d35;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const SetDetailsWrapper = styled.div`
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
