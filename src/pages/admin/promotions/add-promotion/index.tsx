import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { usePromotionsContext } from '../../../../context/promotions';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';

export const AddPromotion = () => {
    const [promotion, setPromotion] = useState({
        title: '',
        description: '',
        selectedFile: null as File | null,
        startDate: '',
        endDate: '',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { createPromotion } = usePromotionsContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setPromotion((prev) => ({ ...prev, selectedFile: null }));
        setPreviewUrl(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPromotion((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPromotion((prev) => ({ ...prev, selectedFile: file }));
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
        setIsButtonDisabled(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const { title, description, selectedFile, startDate, endDate } = promotion;

        if (!title || !description || !selectedFile || !startDate || !endDate) {
            setError('All fields are required.');
            setIsButtonDisabled(false);
            return;
        }

        // Validate dates using Moment.js
        const today = moment().startOf('day');
        const selectedStartDate = moment(startDate, 'YYYY-MM-DD').startOf('day');
        const selectedEndDate = moment(endDate, 'YYYY-MM-DD').startOf('day');

        if (selectedStartDate.isBefore(today)) {
            setError('Start date cannot be in the past.');
            setIsButtonDisabled(false);
            return;
        }

        if (selectedEndDate.isBefore(selectedStartDate)) {
            setError('End date cannot be before the start date.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            await createPromotion(title, description, selectedFile, startDate, endDate);
            setSuccess('Promotion added successfully!');
            clearFileInput();
            setPromotion({ title: '', description: '', selectedFile: null, startDate: '', endDate: '' });
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    const today = moment().format('YYYY-MM-DD'); // Get today's date for min attribute

    return (
        <PromotionContainer>
            <PromotionTitle>Add New Promotion</PromotionTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label htmlFor="title">Promotion Title</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="title"
                                value={promotion.title}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                variant="description"
                                type="text"
                                id="description"
                                value={promotion.description}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="startDate">Start Date</Label>
                            <DateInput
                                type="date"
                                id="startDate"
                                value={promotion.startDate}
                                onChange={handleInputChange}
                                min={today} // Prevent past dates
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="endDate">End Date</Label>
                            <DateInput
                                type="date"
                                id="endDate"
                                value={promotion.endDate}
                                onChange={handleInputChange}
                                min={promotion.startDate || today} // Ensure end date is after start date
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
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? 'Adding...' : 'Add Promotion'}
                            </Button>
                        </ButtonContainer>
                    </FormWrapper>
                </Form>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && <ImagePreview src={previewUrl} alt="Image preview" />}
                </ImagePreviewContainer>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </PromotionContainer>
    );
};

const PromotionContainer = styled.div`
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

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PromotionTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
`;

const FormWrapper = styled.div`
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
    justify-content: flex-start;
    margin-top: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const DateInput = styled.input`
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #4d3c7b;
    font-size: 16px;
    background-color: #2a1f51;
    color: white;
    outline: none;
    width: 50%;
    text-align: center;
    text-transform: uppercase;

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    &:focus {
        border-color: #e6b800;
        box-shadow: 0px 0px 5px #e6b800;
    }
`;

const ImagePreviewContainer = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: 14px;
    margin-top: 1rem;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    margin-top: 1rem;
`;

export default AddPromotion;
