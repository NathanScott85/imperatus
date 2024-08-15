import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useAppContext } from '../../../../context';
import { Modal } from '../../../../components/modal';

interface Transaction {
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
    const [storeCredit, setStoreCredit] = useState(0);
    const [amount, setAmount] = useState<number>(0);
    const [operation, setOperation] = useState<'+' | '-'>('+');
    const [history, setHistory] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { deleteUserAccount } = useAppContext();

    const isCustomerAdminOrOwner = userRoles.some(
        (role: any) => role.role.name === 'ADMIN' || role.role.name === 'OWNER',
    );

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value) || 0);
    };

    const handleOperationSelect = (operation: '+' | '-') => {
        setOperation(operation);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (storeCredit === 0 && operation === '-') {
            setError('Cannot subtract from a zero balance.');
            return;
        }

        if (amount === 0) {
            setError('Amount must be greater than zero.');
            return;
        }

        setError(null); // Clear any existing errors

        let newCredit = storeCredit;

        if (operation === '+') {
            newCredit += amount;
        } else if (operation === '-') {
            newCredit = Math.max(0, storeCredit - amount);
        }

        setStoreCredit(newCredit);

        const newTransaction: Transaction = {
            id: history.length + 1,
            operation,
            amount,
            resultingCredit: newCredit,
            timestamp: new Date(),
        };

        setHistory([...history, newTransaction]);

        setAmount(0);
    };

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

                <StoreCreditContainer>
                    <h2>Store Credit</h2>
                    <p>Current Store Credit: £{storeCredit.toFixed(2)}</p>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <OperationButton
                                type="button"
                                selected={operation === '+'}
                                onClick={() => handleOperationSelect('+')}
                            >
                                +
                            </OperationButton>
                            <OperationButton
                                type="button"
                                selected={operation === '-'}
                                onClick={() => handleOperationSelect('-')}
                            >
                                -
                            </OperationButton>
                            <Input
                                variant="birthday"
                                type="number"
                                value={amount.toString()}
                                onChange={handleAmountChange}
                            />
                        </InputGroup>
                        <Button variant="primary" size="small" type="submit">
                            Submit
                        </Button>
                    </Form>
                </StoreCreditContainer>
                <StoreCreditHistory>
                    <h2>Store Credit History</h2>
                    <ul>
                        {history.map((transaction) => (
                            <li key={transaction.id}>
                                <span>
                                    <strong>Date:</strong>
                                    <span>
                                        {transaction.timestamp.toLocaleDateString()}
                                    </span>
                                </span>
                                <span>
                                    <strong>Time:</strong>
                                    <span>
                                        {transaction.timestamp.toLocaleTimeString()}
                                    </span>
                                </span>
                                <span>
                                    <strong>Credit/Subtraction:</strong>
                                    <span>
                                        {transaction.operation} £
                                        {transaction.amount.toFixed(2)}
                                    </span>
                                </span>
                                <span>
                                    <strong>Balance:</strong>
                                    <span>
                                        £
                                        {transaction.resultingCredit.toFixed(2)}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </StoreCreditHistory>

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
    height: 550px;
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

const StoreCreditContainer = styled.div`
    padding: 1.5rem;
    p {
        font-size: 12px;
    }
    border-radius: 8px;
    color: white;
    width: 225px;

    border: 1px solid #ac8fff;
    h2 {
        font-size: 14px;
        margin-bottom: 1rem;
        font-family: Cinzel;
    }
    height: fit-content;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputGroup = styled.div`
    display: flex;
    align-items: center;
`;

const OperationButton = styled.button<{ selected: boolean }>`
    background-color: ${({ selected }) => (selected ? '#c79d0a' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    margin: 0.5rem;
    &:hover {
        background-color: ${({ selected }) =>
            selected ? '#a17c00' : '#2a1f51'};
    }
`;

const StoreCreditHistory = styled.div`
    width: 250px;
    h2 {
        margin-bottom: 0.5rem;
        font-family: Cinzel;
        color: #fff;
        text-align: center;
        font-size: 14px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        background-color: #160d35;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        border: 1px solid #ac8fff;
    }
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 14px;
        margin-right: 0.25rem;
    }

    span {
        font-family: Barlow, sans-serif;
        font-size: 14px;
        color: #fff;
        display: flex;
        justify-content: space-between;
    }
`;
