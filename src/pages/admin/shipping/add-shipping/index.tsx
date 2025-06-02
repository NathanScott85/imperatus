import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { ProductDropdown } from '../../products/add-product/dropdown';
import { useShippingContext } from '../../../../context/shipping';

export const AddShipping = () => {
    const { createShippingOption, shippingProviders, fetchShippingProviders } =
        useShippingContext();

    const [form, setForm] = useState({
        name: '',
        cost: '',
        estimatedDays: '',
        description: '',
        provider: null as number | null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({
        provider: false,
    });

    useEffect(() => {
        fetchShippingProviders();
    }, [fetchShippingProviders]);

    const handleDropdownToggle = (dropdown: string) => {
        console.log('Selected value:', dropdown);
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

    const handleDropdownChange = (field: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
        setDropdownStates({
            provider: false,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { name, cost, estimatedDays, provider } = form;

        if (!name || !cost || !estimatedDays || provider === null) {
            setError('All fields except description are required.');
            return;
        }
        console.log('Form data:', form.provider);
        const result = await createShippingOption({
            name,
            cost: parseFloat(cost),
            estimatedDays: parseInt(estimatedDays, 10),
            description: form.description,
            isActive: true,
            providerId: form.provider as any,
        });

        if (result.success) {
            setSuccess('Shipping option created successfully.');
            setForm({
                name: '',
                cost: '',
                estimatedDays: '',
                description: '',
                provider: null,
            });
        } else {
            setError(result.message || 'Error creating shipping option.');
        }
    };

    return (
        <ShippingContainer>
            <ShippingTitle>Add Shipping Option</ShippingTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label>Shipping Name</Label>
                            <Input
                                variant="secondary"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter shipping name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Cost</Label>
                            <Input
                                variant="secondary"
                                type="number"
                                id="cost"
                                value={form.cost}
                                onChange={handleChange}
                                placeholder="Enter cost"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Select Provider</Label>
                            <ProductDropdown
                                label="Provider"
                                handleDropdownToggle={handleDropdownToggle}
                                handleDropdownChange={handleDropdownChange}
                                toggleValue="provider"
                                isDropdownOpen={dropdownStates.provider}
                                header={
                                    form.provider
                                        ? shippingProviders.find(
                                              (p) => p.id === form.provider,
                                          )?.name
                                        : 'Select Provider'
                                }
                                values={shippingProviders}
                                selectedValue="provider"
                                displayField="name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Estimated Days</Label>
                            <Input
                                variant="secondary"
                                type="number"
                                id="estimatedDays"
                                value={form.estimatedDays}
                                onChange={handleChange}
                                placeholder="Enter estimated days"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description (Optional)</Label>
                            <Input
                                variant="secondary"
                                id="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                            />
                        </FormGroup>
                        <Button type="submit" variant="primary">
                            Add Shipping Option
                        </Button>
                        {error && <Error>{error}</Error>}
                        {success && <Success>{success}</Success>}
                    </FormWrapper>
                </Form>
            </FormContainer>
        </ShippingContainer>
    );
};

const ShippingContainer = styled.div`
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

const ShippingTitle = styled.h2`
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

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const Error = styled.p`
    color: red;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;

const Success = styled.p`
    color: green;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;
