import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useCarouselContext } from '../../../../context/carousel';
import { useBrandsContext } from '../../../../context/brands';
import { Modal } from '../../../../components/modal';
import { useProductsContext } from '../../../../context/products';

export interface CarouselDetailProps {
    carousel: any;
    onBack: () => void;
}

export const UpdateCarousel: React.FC<CarouselDetailProps> = ({ carousel, onBack }) => {
    const { updateCarousel, deleteCarousel } = useCarouselContext();
    const { brands, fetchBrands } = useBrandsContext();
    const { products, fetchProducts } = useProductsContext();

    const [title, setTitle] = useState(carousel.title);
    const [description, setDescription] = useState(carousel.description);
    const [buttonText, setButtonText] = useState(carousel.buttonText || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>(carousel.brand?.id || null);
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>(carousel.product?.id || null);
    const [disabled, setDisabled] = useState<boolean>(carousel.disabled || false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchBrands();
        fetchProducts();
    }, [fetchBrands, fetchProducts]);

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

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

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedBrandId(e.target.value);

    const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setButtonText(e.target.value);
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(e.target.value);
    }

    const handleDisabledChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDisabled(e.target.checked);

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!title) {
            setError('Title is required.');
            setIsUpdating(false);
            return;
        }

        try {
            await updateCarousel(
                carousel.id,
                title,
                description,
                buttonText,
                selectedFile || null,
                selectedBrandId,
                selectedProductId,
                disabled
            );

            setSuccess('Carousel updated successfully!');
            clearFileInput();
        } catch (err) {
            setError('Failed to update carousel.');
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

        setIsDeleting(true);

        try {
            await deleteCarousel(carousel.id);
            setSuccess('Carousel deleted successfully!');
            handleCloseModal();
            onBack();
        } catch (err) {
            setError('Failed to delete carousel.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <CarouselContainer>
            <FormTitle>Edit Carousel</FormTitle>
            <BackButton onClick={onBack}>Back to Carousel</BackButton>
            <CarouselWrapper>
                <CarouselDetailsWrapper>
                    <FormGroup>
                        <Label htmlFor="title">Carousel Title</Label>
                        <Input
                            variant="secondary"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
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
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="buttonText"
                            value={buttonText}
                            onChange={handleButtonTextChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <CheckboxContainer>
                            <input
                                type="checkbox"
                                id="disabled"
                                checked={disabled}
                                onChange={handleDisabledChange}
                            />
                            <Label htmlFor="disabled">Disable Page</Label>
                        </CheckboxContainer>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="brand">Select Brand</Label>
                        <Select
                            id="brand"
                            value={selectedBrandId || ''}
                            onChange={handleBrandChange}
                        >
                            <option value="" disabled>
                                -- Select Brand --
                            </option>
                            {brands.map((brand: any) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="product">Select Product</Label>
                        <Select
                            id="product"
                            value={selectedProductId || ''}
                            onChange={handleProductChange}
                        >
                            <option value="">
                                -- Select Product --
                            </option>
                            {products!?.map((product: any) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Select>
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
                            {isUpdating ? 'Updating...' : 'Update Carousel'}
                        </Button>

                        <Button
                            variant="primary"
                            onClick={handleOpenModal}
                            disabled={isDeleting}
                        >
                            Delete Carousel
                        </Button>
                    </ButtonContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </CarouselDetailsWrapper>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && (
                        <ImagePreview src={previewUrl} alt="Image preview" />
                    )}
                    <br />
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
            </CarouselWrapper>
            {isModalVisible && (
                <Modal
                    title="Delete Carousel Page"
                    content="Are you sure you want to delete this carousel page? This action cannot be undone."
                    label='To confirm this, type "DELETE"'
                    confirmationText={confirmationText}
                    errorMessage={error}
                    successMessage={success}
                    setConfirmationText={setConfirmationText}
                    handleDeleteAccount={handleDelete}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </CarouselContainer>
    );
};


const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CarouselContainer = styled.div`
    color: white;
    width: 100%;
`;

const CarouselWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const CarouselDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 0.5rem;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
    }
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

const Select = styled.select`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    border: 1px solid #4d3c7b;
    background-color: #160d35;
    color: white;

    option {
        background-color: #160d35;
        color: white;
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
