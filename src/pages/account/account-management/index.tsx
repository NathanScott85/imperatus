import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';
import { useAppContext } from '../../../context';
import { Modal } from '../../../components/modal';

export const AccountManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user, deleteUserAccount, isAdminOrOwner } = useAppContext();

    const handleOpenModal = () => {
        setIsModalVisible(true);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setConfirmationText('');
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleDeleteAccount = async () => {
        if (confirmationText !== 'DELETE') {
            setErrorMessage('Please type "DELETE" to confirm');
            return;
        }

        if (!user) {
            setErrorMessage('User is not logged in or user data is missing.');
            return;
        }

        try {
            await deleteUserAccount(user.id);
            setSuccessMessage('Account deleted successfully.');
            handleCloseModal();
        } catch (error) {
            setErrorMessage('An error occurred while deleting the account.');
        }
    };

    return (
        <PaymentDetailsContainer>
            <h3>Account Management</h3>
            {isAdminOrOwner && <h5>Account Deletion Disabled for Owner</h5>}
            <Button
                variant="primary"
                size="small"
                label="Delete Account"
                onClick={handleOpenModal}
                disabled={isAdminOrOwner}
            />
            {isModalVisible && (
                <Modal
                    title="Delete Account"
                    content=" Deleting this account will remove all of the customer's
                    information from our database. This cannot be undone."
                    label='To confirm this, type "DELETE"'
                    confirmationText={confirmationText}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    setConfirmationText={setConfirmationText}
                    handleDeleteAccount={handleDeleteAccount}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </PaymentDetailsContainer>
    );
};

const PaymentDetailsContainer = styled.div`
    padding: 0rem 2rem 2rem 2rem;
    h3 {
        padding-bottom: 1rem;
        font-family: Cinzel;
        font-size: 20px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
    h5 {
        padding-bottom: 1rem;
        font-family: Barlow;
        font-size: 14px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
    button {
        margin-top: 1rem;
    }
`;
