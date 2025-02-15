import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';
import { useBrandsContext } from '../../../../context/brands';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';

export const AddCardType = () => {
    const [cardType, setCardType] = useState({
        name: '',
        selectedBrand: 0,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { createCardType } = useAdminContext();
    const { brands, fetchBrands } = useBrandsContext();

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardType({ ...cardType, name: e.target.value });
        setIsButtonDisabled(false);
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandId = Number(e.target.value);
        setCardType({ ...cardType, selectedBrand: brandId });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        const { name, selectedBrand } = cardType;

        if (!name) {
            setError('Card Type Name is required.');
            setIsButtonDisabled(false);
            return;
        }

        if (!selectedBrand) {
            setError('Brand selection is required.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const { success, message } = await createCardType({
                name,
                brandId: selectedBrand,
            });

            if (success) {
                setSuccess(message);
                setCardType({ name: '', selectedBrand: 0 });
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
        <CardTypeContainer>
            <CardTypeTitle>Add New Card Type</CardTypeTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Card Type Name</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="name"
                            value={cardType.name}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="brand">Select Brand</Label>
                        <Select id="brand" value={cardType.selectedBrand} onChange={handleBrandChange}>
                            <option value={0}>Select a Brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>

                    <ButtonContainer>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!cardType.name || !cardType.selectedBrand || isButtonDisabled}
                        >
                            {isButtonDisabled ? 'Adding...' : 'Add Card Type'}
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </CardTypeContainer>
    );
};

// Styled Components
const CardTypeContainer = styled.div`
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

const CardTypeTitle = styled.h2`
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
    width: 100%;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
    width: 100%;
`;

const Select = styled.select`
    width: 31.5%;
    padding: 0.5rem;
    border: 1px solid #4d3c7b;
    background-color: #160d35;
    color: white;
    font-size: 14px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 1rem;
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

