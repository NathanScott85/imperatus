import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useAdminContext } from '../../../../context/admin';

export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { createCategory, categoryLoading, categoryError, categorySuccess } =
        useAdminContext();
    useEffect(() => {
        if (categoryError) {
            setError(categoryError);
        } else if (categorySuccess) {
            setSuccess('Category created successfully!');
            setCategoryName('');
            setDescription('');
            setSelectedFile(null);
        }
    }, [categoryError, categorySuccess]);

    const handleCategoryNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryName(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!categoryName || !description || !selectedFile) {
            setError('All fields are required, including an image.');
            return;
        }

        try {
            await createCategory({
                name: categoryName,
                description,
                img: selectedFile, // File object passed directly here
            });
        } catch (error) {
            // Check if the error message contains specific keywords
            const errorMessage = (error as Error).message;
            if (errorMessage.includes('contentType')) {
                setError(
                    'Failed to upload the image. The content type is missing or incorrect.',
                );
            } else {
                setError('Failed to create category. Please try again later.');
            }
        }
    };

    return (
        <AddCategoryContainer>
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
                            onChange={handleImageChange}
                            required
                        />
                    </FormGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={
                            !categoryName ||
                            !description ||
                            !selectedFile ||
                            categoryLoading
                        }
                    >
                        {categoryLoading ? 'Creating...' : 'Create Category'}
                    </Button>
                </Form>
                {error ||
                    (categoryError && (
                        <ErrorMessage>{error || categoryError}</ErrorMessage>
                    ))}
                {success ||
                    (categorySuccess && (
                        <SuccessMessage>{success}</SuccessMessage>
                    ))}
            </div>
        </AddCategoryContainer>
    );
};

const AddCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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
    color: #c79d0a;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
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
