import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { Modal } from '../../../../components/modal';
import { useDiscountCodesContext } from '../../../../context/discount';
import moment from 'moment';
import { ProductDropdown } from '../../products/add-product/dropdown';

export interface DiscountCodeDetailProps {
    code: {
        id: number;
        code: string;
        description?: string;
        type: 'percentage' | 'fixed';
        value: number;
        expiresAt?: string;
        active: boolean;
    };
    onBack: () => void;
}

const discountTypes = [
    { id: 'percentage', name: 'Percentage' },
    { id: 'fixed', name: 'Fixed' },
];

export const DiscountCodeDetail: React.FC<DiscountCodeDetailProps> = ({
    code,
    onBack,
}) => {
    const { updateDiscountCode, deleteDiscountCode, fetchDiscountCodes } =
        useDiscountCodesContext();

    const [form, setForm] = useState({
        code: code.code,
        description: code.description || '',
        type: code.type,
        value: code.value,
        expiresAt: code.expiresAt
            ? moment(code.expiresAt).format('YYYY-MM-DD')
            : '',
        active: code.active,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({
        discountType: false,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const target = e.target as HTMLInputElement;
        const { id, value, type } = target;
        const checked = target.checked;
        setForm((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        try {
            await updateDiscountCode(code.id, {
                ...form,
                value: parseFloat(form.value.toString()),
                expiresAt: form.expiresAt
                    ? moment(form.expiresAt).toDate()
                    : undefined,
            });
            fetchDiscountCodes();
            setSuccess('Discount code updated successfully!');
        } catch {
            setError('Failed to update discount code.');
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
            setError('Please type "DELETE" to confirm.');
            return;
        }

        try {
            await deleteDiscountCode(code.id);
            setSuccess('Discount code deleted successfully!');
            fetchDiscountCodes();
            handleCloseModal();
            onBack();
        } catch {
            setError('Failed to delete discount code.');
        } finally {
            setIsDeleting(false);
        }
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

    return (
        <Container>
            <FormTitle>Edit Discount Code</FormTitle>
            <BackButton onClick={onBack}>Back to Discount Codes</BackButton>
            <Wrapper>
                <FormGroup>
                    <Label>Code</Label>
                    <Input
                        id="code"
                        variant="secondary"
                        value={form.code}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        id="description"
                        variant="secondary"
                        value={form.description}
                        onChange={handleChange}
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
                            ? discountTypes.find((t) => t.id === form.type)
                                  ?.name
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
                        type="number"
                        variant="secondary"
                        value={form.value}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Expires At</Label>
                    <Input
                        id="expiresAt"
                        type="date"
                        variant="secondary"
                        value={form.expiresAt}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        <input
                            type="checkbox"
                            id="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        Active
                    </label>
                </FormGroup>
                <ButtonContainer>
                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Discount'}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOpenModal}
                        disabled={isDeleting}
                    >
                        Delete Discount
                    </Button>
                </ButtonContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </Wrapper>

            {isModalVisible && (
                <Modal
                    title="Delete Discount Code"
                    content="Are you sure you want to delete this discount code? This action cannot be undone."
                    label='To confirm this, type "DELETE"'
                    confirmationText={confirmationText}
                    errorMessage={error}
                    successMessage={success}
                    setConfirmationText={setConfirmationText}
                    handleDeleteAccount={handleDelete}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </Container>
    );
};

const Container = styled.div`
    color: white;
    width: 100%;
`;

const Wrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
`;

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;

    select {
        width: 100%;
        padding: 0.5rem;
        font-family: Barlow;
        font-size: 14px;
        background-color: #2a1f51;
        color: white;
        border: 1px solid #4d3c7b;
        border-radius: 4px;
    }
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
    gap: 1rem;
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
