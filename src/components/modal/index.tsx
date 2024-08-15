import React from 'react';
import { FancyContainer } from '../fancy-container';
import styled from 'styled-components';
import Button from '../button';
import { Input } from '../input';

interface ModalProps {
    confirmationText: any;
    errorMessage: any;
    successMessage: any;
    setConfirmationText: any;
    handleDeleteAccount: any;
    handleCloseModal: any;
    title: string;
    content: string;
    label: string;
}

export const Modal = ({
    confirmationText,
    errorMessage,
    successMessage,
    setConfirmationText,
    handleDeleteAccount,
    handleCloseModal,
    title,
    content,
    label,
}: ModalProps) => {
    return (
        <FancyContainer variant="modal" size="modal">
            <ModalContent>
                <h1>{title}</h1>
                <p>{content}</p>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                {successMessage && (
                    <SuccessMessage>{successMessage}</SuccessMessage>
                )}
                <label htmlFor="confirmation">{label}</label>
                <Input
                    variant="secondary"
                    size="medium"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
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
    );
};

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

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 14px;
    margin-bottom: 1rem;
    text-align: center;
`;

const ErrorMessage = styled.div`
    color: #ff4d4f;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
    background-color: #2a1f51;
    padding: 0.5rem;
    border-radius: 4px;
`;
