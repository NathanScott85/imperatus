import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useCarouselContext } from '../../../../context/carousel';
import { useBrandsContext } from '../../../../context/brands';
import { useAdminContext } from '../../../../context/admin';

export const AddCarousel = () => {
    const { addCarousel, loading } = useCarouselContext();
    const { brands, fetchBrands } = useBrandsContext();
    const [buttonText, setButtonText] = useState('');
    const { products, fetchProducts } = useAdminContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>(undefined);
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        fetchBrands();
        fetchProducts();
    }, [selectedFile, fetchBrands, fetchProducts]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
        setIsButtonDisabled(false);
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBrandId(e.target.value || undefined);
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(e.target.value || undefined);
    };
    const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setButtonText(e.target.value);
    };

    const handleDisabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisabled(e.target.checked);
    };

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSelectedFile(null);
    };

    const handleClearFile = () => {
        clearFileInput();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        if (!title || !selectedFile) {
            setError('Title and an image are required.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            await addCarousel(title, description, selectedFile, buttonText , Number(selectedBrandId), selectedProductId, disabled);
            setSuccess('Carousel page created successfully!');
            setError('');
            setTitle('');
            setDescription('');
            setSelectedBrandId(undefined);
            setSelectedProductId(undefined);
            setDisabled(false);
            clearFileInput();
        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage || 'Failed to create carousel page. Please try again.');
            setSuccess('');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <CarouselContainer>
            <div>
                <CarouselTitle>Add Carousel Page</CarouselTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            variant="secondary"
                            type="text"
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
                        <Label htmlFor="brand">Select Brand</Label>
                        <Select
                            id="brand"
                            value={selectedBrandId || ''}
                            onChange={handleBrandChange}
                        >
                            <option value="">No Brand Selected</option>
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
                            <option value="">No Product Selected</option>
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
                            required
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
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !title ||
                                !selectedFile ||
                                isButtonDisabled ||
                                loading
                            }
                        >
                            {loading ? 'Creating...' : 'Create Carousel'}
                        </Button>
                        {selectedFile && (
                            <Button
                                variant="secondary"
                                size="xsmall"
                                onClick={handleClearFile}
                            >
                                Clear File
                            </Button>
                        )}
                    </ButtonContainer>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </div>
            <ImagePreviewContainer>
                <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                {previewUrl && <ImagePreview src={previewUrl} alt="Image preview" />}
            </ImagePreviewContainer>
        </CarouselContainer>
    );
};

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CarouselContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2rem;
    background-color: #160d35;
    color: white;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const CarouselTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const Form = styled.form`
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
    justify-content: space-between;
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

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #4d3c7b;
    border-radius: 4px;
    background-color: #160d35;
    color: white;
    font-family: Barlow, sans-serif;
    font-size: 14px;
`;
