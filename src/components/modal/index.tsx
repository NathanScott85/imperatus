import React from 'react';
import { FancyContainer } from '../fancy-container';
import styled from 'styled-components';
import Button from '../button';
import { Input } from '../input';

import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface ModalProps {
    confirmationText?: string;
    errorMessage?: string;
    successMessage?: string;
    setConfirmationText?: Dispatch<SetStateAction<string>>;
    handleDeleteAccount?: () => void;
    handleCloseModal?: () => void;
    title?: string;
    content: string | ReactNode;
    label?: string;
    preview?: boolean;
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
    preview = false,
}: ModalProps) => {
    return (
        <FancyContainer variant="modal" size="modal">
            <ModalContent preview={preview}>
                <h1>{title}</h1>
                <p>{content}</p>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                {successMessage && (
                    <SuccessMessage>{successMessage}</SuccessMessage>
                )}
                {!preview && label && (
                    <>
                        <label htmlFor="confirmation">{label}</label>
                        <Input
                            id="confirmation"
                            variant="secondary"
                            size="medium"
                            value={confirmationText}
                            onChange={(e) =>
                                setConfirmationText?.(e.target.value)
                            }
                        />
                    </>
                )}
                <ButtonWrapper>
                    {!preview && (
                        <Button
                            onClick={handleDeleteAccount}
                            variant="primary"
                            size="small"
                            label="Confirm"
                        />
                    )}
                    <Button
                        onClick={handleCloseModal}
                        variant="secondary"
                        size="small"
                        label={preview ? 'Close' : 'Cancel'}
                    />
                </ButtonWrapper>
            </ModalContent>
        </FancyContainer>
    );
};

const ModalContent = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'preview',
})<{ preview?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;

    h1 {
        color: ${({ preview }) => (preview ? 'white' : 'red')};
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
