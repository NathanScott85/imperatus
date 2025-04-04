import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { Transaction } from '..';
import { gql, useMutation } from '@apollo/client';

interface StoreCreditProps {
    setHistory: any;
    history: any;
    customer: any;
}

const UPDATE_STORE_CREDIT = gql`
    mutation UpdateUserStoreCredit($id: Int!, $amount: Float!) {
        updateUserStoreCredit(id: $id, amount: $amount) {
            id
            storeCredit
        }
    }
`;

export const StoreCredit = ({
    setHistory,
    history,
    customer,
}: StoreCreditProps) => {
    const [storeCredit, setStoreCredit] = useState(0);
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [operation, setOperation] = useState<'+' | '-'>('+');

    const [updateStoreCredit, { loading, error: mutationError }] =
        useMutation(UPDATE_STORE_CREDIT);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value) || 0);
    };

    const handleOperationSelect = (operation: '+' | '-') => {
        setOperation(operation);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (storeCredit === 0 && operation === '-') {
            setError('Cannot subtract from a zero balance.');
            return;
        }

        if (amount === 0) {
            setError('Amount must be greater than zero.');
            return;
        }

        setError(null);

        let newCredit = storeCredit;

        if (operation === '+') {
            newCredit += amount;
        } else if (operation === '-') {
            newCredit = Math.max(0, storeCredit - amount);
        }

        try {
            const { data } = await updateStoreCredit({
                variables: {
                    id: customer.id,
                    amount: newCredit, // Pass only the amount
                },
            });

            setStoreCredit(data.updateUserStoreCredit.storeCredit);

            const newTransaction: Transaction = {
                id: history.length + 1,
                operation,
                amount,
                resultingCredit: newCredit,
                timestamp: new Date(),
            };

            setHistory([...history, newTransaction]);
        } catch (err) {
            setError('An error occurred while updating store credit.');
        }

        setAmount(0);
    };

    return (
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
                <Button
                    label=" Submit"
                    variant="primary"
                    type="submit"
                    disabled={loading}
                />

                {error && <p>{error}</p>}
                {mutationError && <p>{mutationError.message}</p>}
            </Form>
        </StoreCreditContainer>
    );
};

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
