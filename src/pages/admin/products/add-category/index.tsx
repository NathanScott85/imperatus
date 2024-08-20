import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';

export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (categoryName && description && image) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [categoryName, description, image]);

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
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Add logic to send the data to your backend API
        try {
            const formData = new FormData();
            formData.append('name', categoryName);
            formData.append('description', description);
            if (image) {
                formData.append('img', image);
            }

            // Assuming the API call is successful
            setSuccess('Category created successfully!');
        } catch (error) {
            setError('Failed to create category.');
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
                        {!categoryName && (
                            <ErrorMessage>
                                Category name is required.
                            </ErrorMessage>
                        )}
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
                        {!description && (
                            <ErrorMessage>
                                Category description is required.
                            </ErrorMessage>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="image">Upload Image</Label>
                        <Input
                            variant="upload"
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            required
                        />
                        {!image && (
                            <ErrorMessage>Image is required.</ErrorMessage>
                        )}
                    </FormGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Create Category
                    </Button>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
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
    margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
    color: green;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;
