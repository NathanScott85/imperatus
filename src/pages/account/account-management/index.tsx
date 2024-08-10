import React, { useState } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import Button from '../../../components/button'; // Assuming you have a Button component
import { useAppContext } from '../../../context';

export const AccountManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { userRoles } = useAppContext();

    const isOwner = userRoles.includes('OWNER');

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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
                        <label htmlFor="">To confirm this, type "DELETE"</label>
                        <Input variant="secondary" size="medium" />
                        <ButtonWrapper>
                            <Button
                                onClick={handleCloseModal}
                                variant="primary"
                                size="small"
                                label="Confirm"
                            />
                            <Button
                                onClick={handleCloseModal}
                                variant="secondary"
                                size="small"
                                label="      Cancel"
                            />
                        </ButtonWrapper>
                    </ModalContent>
                </FancyContainer>
            )}
        </PaymentDetailsContainer>
    );
};

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

export const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 3;
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
        color: white;
        margin-right: 0.5rem;
        font-size: 16px;
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
