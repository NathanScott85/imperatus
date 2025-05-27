import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Button from '../../../../components/button';
import { useAppContext } from '../../../../context';
import { Modal } from '../../../../components/modal';
import { StoreCredit } from './store-credit';
import { StoreCreditHistory } from './store-credit/history';

export interface Transaction {
    id: number;
    operation: '+' | '-';
    amount: number;
    resultingCredit: number;
    timestamp: Date;
}

export const Customer: React.FC<{
    customer: any;
    onBack: () => void;
    userRoles: any[];
}> = ({ customer, onBack, userRoles }) => {
    const [history, setHistory] = useState<Transaction[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { deleteUserAccount } = useAppContext();

    const isCustomerAdminOrOwner = userRoles.some(
        (role: any) => role.role.name === 'ADMIN' || role.role.name === 'OWNER',
    );

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

        try {
            await deleteUserAccount(customer.id);
            setSuccessMessage('Account deleted successfully.');
            handleCloseModal();
            onBack();
        } catch (error) {
            setErrorMessage('An error occurred while deleting the account.');
        }
    };

    return (
        <CustomerMain>
            <BackButton onClick={onBack}>Back to Customers</BackButton>
            <CustomerContainer>
                <CustomerDetails>
                    <strong>Full Name</strong>
                    <CustomerDetail>{customer.fullname}</CustomerDetail>
                    <strong>Email</strong>
                    <CustomerDetail>{customer.email}</CustomerDetail>
                    <strong>Date of Birth</strong>
                    <CustomerDetail>
                        {moment(customer.dob).format('MM/DD/YYYY')}
                    </CustomerDetail>
                    <strong>Phone</strong>
                    <CustomerDetail>{customer.phone}</CustomerDetail>
                    <strong>Street Number / Name</strong>
                    <CustomerDetail>{customer.address}</CustomerDetail>
                    <strong>City</strong>
                    <CustomerDetail>{customer.city}</CustomerDetail>
                    <strong>Postcode</strong>
                    <CustomerDetail>{customer.postcode}</CustomerDetail>
                    {isCustomerAdminOrOwner && (
                        <h5>Account Deletion Disabled for Owner</h5>
                    )}
                    <Button
                        variant="primary"
                        size="small"
                        label="Delete Account"
                        onClick={handleOpenModal}
                        disabled={isCustomerAdminOrOwner}
                    />
                </CustomerDetails>
                <StoreCredit
                    setHistory={setHistory}
                    history={history}
                    customer={customer}
                />
                <StoreCreditHistory userId={customer.id} />
                {isModalVisible && (
                    <Modal
                        title="Delete Account"
                        content="Deleting this account will remove all of the customer's
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
            </CustomerContainer>
        </CustomerMain>
    );
};

const CustomerMain = styled.div`
    color: white;
    width: 100%;
`;

const CustomerContainer = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    height: 600px;
    align-items: flex-start;
`;

const CustomerDetails = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 0.5rem;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
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
`;

const CustomerDetail = styled.p`
    font-family: Barlow;
    font-size: 14px;
    color: white;
    padding-bottom: 0.5rem;
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
