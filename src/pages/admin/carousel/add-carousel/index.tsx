import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCarouselContext } from '../../../../context/carousel';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';

export const AddCarousel = () => {
    const [addCarousel, setAddCarousel] = useState({
        title: '',
        description: '',
        isActive: true,
        selectedImage: null as File | null,
        selectedLogo: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const logoInputRef = useRef<HTMLInputElement | null>(null);

    const { createCarouselItem } = useCarouselContext();

    const clearFileInputs = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (logoInputRef.current) {
            logoInputRef.current.value = '';
        }
        setAddCarousel({
            ...addCarousel,
            selectedImage: null,
            selectedLogo: null,
        });
        setPreviewUrl(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value, type } = e.target;

        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            setAddCarousel({ ...addCarousel, [id]: e.target.checked });
        } else {
            setAddCarousel({ ...addCarousel, [id]: value });
        }

        setIsButtonDisabled(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAddCarousel({ ...addCarousel, selectedImage: file });
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
        setIsButtonDisabled(false);
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAddCarousel({ ...addCarousel, selectedLogo: file });
        }
        setIsButtonDisabled(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const {
            title,
            description,
            isActive,
            selectedImage,
            selectedLogo,
        } = addCarousel;

        if (!title || !selectedImage) {
            setError('All fields are required, including an image.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const { success, message } = await createCarouselItem({
                title,
                description,
                image: selectedImage,
                logo: selectedLogo,
                isActive,
            });

            if (success) {
                setSuccess(message);
                clearFileInputs();
                setAddCarousel({
                    title: '',
                    description: '',
                    isActive: true,
                    selectedImage: null,
                    selectedLogo: null,
                });
            } else {
                setError(message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <CarouselContainer>
            <CarouselTitle>Add Carousel Page</CarouselTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="title"
                            value={addCarousel.title}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            variant="description"
                            id="description"
                            value={addCarousel.description}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="isActive">Active</Label>
                        <Input
                            variant="secondary"
                            type="checkbox"
                            id="isActive"
                            checked={addCarousel.isActive}
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
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="logo">Upload Logo</Label>
                        <Input
                            variant="secondary"
                            type="file"
                            id="logo"
                            ref={logoInputRef}
                            onChange={handleLogoChange}
                        />
                    </FormGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={
                            !addCarousel.title ||
                            !addCarousel.selectedImage ||
                            isButtonDisabled
                        }
                    >
                        {isButtonDisabled ? 'Adding...' : 'Add Carousel Item'}
                    </Button>
                </Form>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && (
                        <ImagePreview src={previewUrl} alt="Image preview" />
                    )}
                </ImagePreviewContainer>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
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

const CarouselTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    margin-top: 1rem;
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

export default AddCarousel;
