import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../../components/input';
import Button from '../../../../../components/button';
import { Modal } from '../../../../../components/modal';
import { useOrdersContext } from '../../../../../context/orders';

export interface OrderStatusDetailProps {
    status: { id: number; value: string; label: string };
    onBack: () => void;
}

export const OrderStatusDetail: React.FC<OrderStatusDetailProps> = ({
    status,
    onBack,
}) => {
    const { updateOrderStatus, deleteOrderStatus, fetchOrderStatus } =
        useOrdersContext();
    const [value, setValue] = useState(status.value);
    const [label, setLabel] = useState(status.label);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');

    const handleUpdate = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        if (!value || !label) {
            setError('Both value and label are required.');
            setIsUpdating(false);
            return;
        }

        try {
            await updateOrderStatus(status.id, value, label);
            fetchOrderStatus();
            setSuccess('Order status updated successfully!');
        } catch (err) {
            setError('Failed to update order status.');
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
            await deleteOrderStatus(status.id);
            fetchOrderStatus();
            setSuccess('Order status deleted successfully!');
            handleCloseModal();
            onBack();
        } catch (err) {
            setError('Failed to delete order status.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Container>
            <FormTitle>Edit Order Status</FormTitle>
            <BackButton onClick={onBack}>Back to Order Statuses</BackButton>
            <Wrapper>
                <FormGroup>
                    <Label>Status Value</Label>
                    <Input
                        variant="secondary"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Status Label</Label>
                    <Input
                        variant="secondary"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>
                <ButtonContainer>
                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Status'}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOpenModal}
                        disabled={isDeleting}
                    >
                        Delete Status
                    </Button>
                </ButtonContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </Wrapper>

            {isModalVisible && (
                <Modal
                    title="Delete Order Status"
                    content="Are you sure you want to delete this order status? This action cannot be undone."
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
