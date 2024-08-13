import React, { useState } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import { useAppContext } from '../../../context';

export const AccountManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user, userRoles, deleteUserAccount } = useAppContext();

    const isOwner = userRoles.includes('OWNER');

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
            {isOwner && <h5>Account Deletion Disabled for Owner</h5>}
            <Button
                variant="primary"
                size="small"
                label="Delete Account"
                onClick={handleOpenModal}
                disabled={isOwner}
            />
            {isModalVisible && (
                <FancyContainer variant="modal" size="modal">
                    <ModalContent>
                        <h1>Delete Account</h1>
                        <p>
                            Deleting your account will remove all of your
                            information from our database. This cannot be
                            undone.
                        </p>
                        {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                        {successMessage && (
                            <SuccessMessage>{successMessage}</SuccessMessage>
                        )}
                        <label htmlFor="confirmation">
                            To confirm this, type "DELETE"
                        </label>
                        <Input
                            variant="secondary"
                            size="medium"
                            value={confirmationText}
                            onChange={(e) =>
                                setConfirmationText(e.target.value)
                            }
                        />
                        <ButtonWrapper>
                            <Button
                                onClick={handleDeleteAccount}
                                variant="primary"
                                size="small"
                                label="Confirm"
                            />
                            <Button
                                onClick={handleCloseModal}
                                variant="secondary"
                                size="small"
                                label="Cancel"
                            />
                        </ButtonWrapper>
                    </ModalContent>
                </FancyContainer>
            )}
        </PaymentDetailsContainer>
    );
};

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
    text-align: center;
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 14px;
    margin-bottom: 1rem;
    text-align: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    h1 {
        color: red;
        font-family: Cinzel;
        font-size: 26px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 100%;
        text-align: center;
        padding: 0.25rem;
        margin-bottom: 0.25rem;
    }
    p {
        color: white;
        font-size: 16px;
        list-style-type: none;
        padding-bottom: 1rem;
        margin-right: 0.5rem;
        flex: 1;
        margin-bottom: 1rem;
        text-align: center;
        font-family: Barlow, serif;
    }
    label {
        color: white;
        font-size: 16px;
        margin-bottom: 1rem;
    }
`;

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
