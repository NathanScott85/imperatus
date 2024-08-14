import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';

interface Transaction {
    id: number;
    operation: '+' | '-';
    amount: number;
    resultingCredit: number;
    timestamp: Date;
}

export const Customer: React.FC<{ customer: any; onBack: () => void }> = ({
    customer,
    onBack,
}) => {
    const [storeCredit, setStoreCredit] = useState(0); // Initial store credit
    const [amount, setAmount] = useState<number>(0); // State for input amount
    const [operation, setOperation] = useState<'+' | '-'>('+'); // State for selected operation
    const [history, setHistory] = useState<Transaction[]>([]); // State for store credit history
    const [error, setError] = useState<string | null>(null); // State for error messages

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

    return (
        <CustomerMain>
            <BackButton onClick={onBack}>Back to Customers</BackButton>
            <CustomerContainer>
                <CustomerDetails>
                    <strong> Full Name </strong>
                    <CustomerDetail>{customer.fullname}</CustomerDetail>
                    <strong> Email: </strong>
                    <CustomerDetail> {customer.email}</CustomerDetail>
                    <strong>Date of Birth: </strong>
                    <CustomerDetail>
                        {' '}
                        {moment(customer.dob).format('MM/DD/YYYY')}
                    </CustomerDetail>
                    <strong>Phone: </strong>
                    <CustomerDetail> {customer.phone}</CustomerDetail>
                    <strong>Street Number / Name</strong>
                    <CustomerDetail>{customer.address}</CustomerDetail>
                    <strong>City</strong>
                    <CustomerDetail>{customer.city} </CustomerDetail>
                    <strong>postcode</strong>
                    <CustomerDetail> {customer.postcode} </CustomerDetail>
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
                        <SubmitButton type="submit">Submit</SubmitButton>
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

// const Input = styled.input`
//     padding: 0.5rem;
//     border: 1px solid #4d3c7b;
//     border-radius: 4px;
//     font-family: Barlow, sans-serif;
//     font-size: 14px;
// `;

const SubmitButton = styled.button`
    background-color: #c79d0a;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;

    &:hover {
        background-color: #a17c00;
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

const ErrorMessage = styled.div`
    color: #ff4d4f;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
    background-color: #2a1f51;
    padding: 0.5rem;
    border-radius: 4px;
`;
