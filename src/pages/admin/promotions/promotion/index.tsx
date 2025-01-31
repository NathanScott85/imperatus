import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { usePromotionsContext } from '../../../../context/promotions';

export interface Promotion {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface PromotionDetailProps {
    promotion: Promotion;
    onBack: () => void;
}

export const Promotion: React.FC<PromotionDetailProps> = ({ promotion, onBack }) => {
    const { updatePromotion, deletePromotion } = usePromotionsContext();

    const [title, setTitle] = useState(promotion.title);
    const [description, setDescription] = useState(promotion.description);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [startDate, setStartDate] = useState(promotion.startDate);
    const [endDate, setEndDate] = useState(promotion.endDate);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'title') setTitle(value);
        if (id === 'description') setDescription(value);
        if (id === 'startDate') setStartDate(value);
        if (id === 'endDate') setEndDate(value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!title || !description || !startDate || !endDate) {
            setError('All fields are required.');
            setIsUpdating(false);
            return;
        }

        try {
            await updatePromotion(Number(promotion.id), title, description, selectedFile, startDate, endDate);

            setSuccess('Promotion updated successfully!');
            clearFileInput();
        } catch (err) {
            setError('Failed to update promotion.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
        setError('');
        setSuccess('');
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setConfirmationText('');
        setError('');
        setSuccess('');
    };

    const handleDelete = async () => {
        if (confirmationText !== 'DELETE') {
            setError('Please type "DELETE" to confirm');
            return;
        }

        try {
            await deletePromotion(Number(promotion.id));
            setSuccess('Promotion deleted successfully!');
            handleCloseModal();
            onBack();
        } catch (err) {
            setError('Failed to delete promotion.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <PromotionContainer>
            <FormTitle>Edit Promotion</FormTitle>
            <BackButton onClick={onBack}>Back to Promotions</BackButton>
            <PromotionWrapper>
                <PromotionDetailsWrapper>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            variant="secondary"
                            id="title"
                            value={title}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            variant="description"
                            id="description"
                            value={description}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            variant="secondary"
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            variant="secondary"
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={handleInputChange}
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
                            {isUpdating ? 'Updating...' : 'Update Promotion'}
                        </Button>
                        {selectedFile && (
                            <Button
                                variant="secondary"
                                size="xsmall"
                                onClick={clearFileInput}
                            >
                                Clear File
                            </Button>
                        )}
                    </ButtonContainer>

                    <ButtonContainer>
                    <Button
                        variant="primary"
                        onClick={handleOpenModal}
                        disabled={isDeleting}
                    >
                            {isDeleting ? 'Deleting...' : 'Delete Promotion'}
                    </Button>
                    </ButtonContainer>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </PromotionDetailsWrapper>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && <ImagePreview src={previewUrl} alt="Image preview" />}
                </ImagePreviewContainer>
            </PromotionWrapper>

            {isModalVisible && (
                <Modal
                    title="Delete Promotion"
                    content="Are you sure you want to delete this promotion? This action cannot be undone."
                    label='To confirm this, type "DELETE"'
                    confirmationText={confirmationText}
                    errorMessage={error}
                    successMessage={success}
                    setConfirmationText={setConfirmationText}
                    handleDeleteAccount={handleDelete}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </PromotionContainer>
    );
};

const PromotionContainer = styled.div`
    color: white;
    width: 100%;
`;

const PromotionWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const PromotionDetailsWrapper = styled.div`
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

const DeleteButton = styled(Button)`
    background-color: #e74c3c;
    &:hover {
        background-color: #c0392b;
    }
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`;

const ImagePreview = styled.img`
    max-width: 200px;
    max-height: 200px;
    border: 1px solid #ac8fff;
    border-radius: 4px;
`;


export default Promotion;
