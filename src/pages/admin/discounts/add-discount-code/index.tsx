import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useDiscountCodesContext } from '../../../../context/discount';
import moment from 'moment';
import { ProductDropdown } from '../../products/add-product/dropdown';

const discountTypes = [
    { id: 'percentage', name: 'Percentage' },
    { id: 'fixed', name: 'Fixed' },
];

export const AddDiscountCode = () => {
    const [form, setForm] = useState({
        code: '',
        description: '',
        type: '',
        value: '',
        expiresAt: '',
        active: true,
    });

    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({
        discountType: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { createDiscountCode, fetchDiscountCodes } =
        useDiscountCodesContext();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { id, value, type } = e.target;
        const val =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : value;
        setForm((prev) => ({ ...prev, [id]: val }));
    };

    const handleDropdownToggle = (dropdown: string) => {
        setDropdownStates((prev) => ({
            ...Object.keys(prev).reduce(
                (acc, key) => {
                    acc[key] = false;
                    return acc;
                },
                {} as Record<string, boolean>,
            ),
            [dropdown]: !prev[dropdown],
        }));
    };

    const handleDropdownChange = (field: string, value: unknown) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
        setDropdownStates({ discountType: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        const { code, description, type, value, expiresAt, active } = form;

        if (!code || !type || !value) {
            setError('Code, type, and value are required.');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await createDiscountCode({
                code,
                description,
                type: type as 'percentage' | 'fixed',
                value: parseFloat(value),
                expiresAt: expiresAt
                    ? moment(expiresAt).format('DD/MM/YYYY')
                    : undefined,
                active,
            });

            if (result.success) {
                setSuccess('Discount code created successfully!');
                setForm({
                    code: '',
                    description: '',
                    type: '',
                    value: '',
                    expiresAt: '',
                    active: true,
                });
                fetchDiscountCodes();
            } else {
                setError(result.message || 'Failed to create discount code.');
            }
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AddDiscountCodeContainer>
            <Title>Add Discount Code</Title>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label>Code</Label>
                            <Input
                                id="code"
                                value={form.code}
                                onChange={handleChange}
                                required
                                variant="secondary"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                id="description"
                                value={form.description}
                                onChange={handleChange}
                                variant="description"
                            />
                        </FormGroup>
                        <ProductDropdown
                            label="Discount Type"
                            handleDropdownToggle={handleDropdownToggle}
                            handleDropdownChange={handleDropdownChange}
                            toggleValue="discountType"
                            isDropdownOpen={dropdownStates.discountType}
                            header={
                                form.type
                                    ? discountTypes.find(
                                          (t) => t.id === form.type,
                                      )?.name
                                    : 'Select Type'
                            }
                            values={discountTypes}
                            selectedValue="type"
                            displayField="name"
                            tooltip
                            tooltipMessage={`Percentage: Applies a percentage-based discount (e.g. 10% off).\n\nFixed: Applies a fixed monetary amount (e.g. £5 off the total).`}
                        />
                        <FormGroup>
                            <Label>Value</Label>
                            <Input
                                id="value"
                                value={form.value}
                                onChange={handleChange}
                                required
                                variant="secondary"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Expires At</Label>
                            <DateInput
                                id="expiresAt"
                                type="date"
                                min={moment().format('YYYY-MM-DD')}
                                value={form.expiresAt}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroupCheckbox>
                            <input
                                type="checkbox"
                                id="active"
                                checked={form.active}
                                onChange={handleChange}
                            />
                            <Label htmlFor="active">Active</Label>
                        </FormGroupCheckbox>
                        <ButtonContainer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Creating...'
                                    : 'Create Discount'}
                            </Button>
                        </ButtonContainer>
                    </FormWrapper>
                </Form>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </AddDiscountCodeContainer>
    );
};

const AddDiscountCodeContainer = styled.div`
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

const Title = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
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

const FormGroupCheckbox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
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
