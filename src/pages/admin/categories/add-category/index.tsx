import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useAdminContext } from '../../../../context/admin';

export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Track the selected file
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { createCategory, categoryLoading, categoryError, categorySuccess } =
        useAdminContext();

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        if (categoryError) {
            setError(categoryError);
            setSuccess('');
            setIsButtonDisabled(false);
            return;
        }

        if (categorySuccess) {
            setSuccess('Category created successfully!');
            setError('');
            setCategoryName('');
            setDescription('');
            setSelectedFile(null);
            clearFileInput();
        }

        setIsButtonDisabled(false);
    }, [categoryError, categorySuccess, selectedFile]);

    const handleCategoryNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryName(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
        setIsButtonDisabled(false);
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

        if (!categoryName || !description || !selectedFile) {
            setError('All fields are required, including an image.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            await createCategory({
                name: categoryName,
                description,
                img: selectedFile,
            });

            setSuccess('Category created successfully!');
            setError('');
            setCategoryName('');
            setDescription('');
            clearFileInput();
        } catch (error) {
            const errorMessage = (error as Error).message;

            const errorMessages: Record<string, string> = {
                'A file with this name already exists':
                    'A file with this name already exists. Please choose a different file or rename it.',
                'Unique constraint failed on the fields':
                    'A category with this name already exists. Please choose a different name.',
            };

            setError(
                errorMessages[errorMessage] ||
                    'Failed to create category. Please try again later.',
            );
            setSuccess('');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <CategoryContainer>
            <div>
                <FormTitle>Add New Category</FormTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">
                            Category Description
                        </Label>
                        <Input
                            variant="description"
                            type="text"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
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
                            onChange={handleImageChange}
                            required
                        />
                    </FormGroup>
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !categoryName ||
                                !description ||
                                isButtonDisabled ||
                                categoryLoading
                            }
                        >
                            {categoryLoading
                                ? 'Creating...'
                                : 'Create Category'}
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
                {previewUrl && (
                    <ImagePreview src={previewUrl} alt="Image preview" />
                )}
            </ImagePreviewContainer>
        </CategoryContainer>
    );
};

const CategoryContainer = styled.div`
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

const FormTitle = styled.h2`
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

    max-width: 75%;
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
