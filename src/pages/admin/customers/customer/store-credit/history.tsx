import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import Button from '../../../../../components/button'; // Import Button component

const GET_STORE_CREDIT_HISTORY = gql`
    query StoreCreditHistory($userId: Int!) {
        storeCreditHistory(userId: $userId) {
            date
            time
            type
            amount
            balanceAfter
        }
    }
`;

interface StoreCreditHistoryProps {
    userId: number;
}

export const StoreCreditHistory: React.FC<StoreCreditHistoryProps> = ({
    userId,
}) => {
    const { loading, error, data, refetch } = useQuery(
        GET_STORE_CREDIT_HISTORY,
        {
            variables: { userId },
        },
    );

    const [formattedTransactions, setFormattedTransactions] = useState([]);
    const [isUpdatingHistory, setIsUpdatingHistory] = useState(false);
    console.log(data, 'data');
    useEffect(() => {
        if (data && data.storeCreditHistory) {
            const formattedData = data.storeCreditHistory.map(
                (transaction: any) => ({
                    ...transaction,
                    formattedDate: moment(transaction.date).format(
                        'DD/MM/YYYY',
                    ),
                    formattedTime: transaction.time,
                }),
            );
            setFormattedTransactions(formattedData);
        }
    }, [data]);

    const handleUpdateHistory = async () => {
        setIsUpdatingHistory(true);
        await refetch();
        setIsUpdatingHistory(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading store credit history.</p>;

    return (
        <HistoryContainer>
            <h2>Store Credit History</h2>
            <ul>
                {formattedTransactions.map(
                    (transaction: any, index: number) => (
                        <li key={index}>
                            <span>
                                <strong>Date:</strong>
                                <span>{transaction.formattedDate}</span>
                            </span>
                            <span>
                                <strong>Time:</strong>
                                <span>{transaction.formattedTime}</span>
                            </span>
                            <span>
                                <strong>Credit/Subtraction:</strong>
                                <span>
                                    {transaction.type === 'credit' ? '+' : '-'}{' '}
                                    £{transaction.amount.toFixed(2)}
                                </span>
                            </span>
                            <span>
                                <strong>Balance:</strong>
                                <span>
                                    £{transaction.balanceAfter.toFixed(2)}
                                </span>
                            </span>
                        </li>
                    ),
                )}
            </ul>
            <Button
                variant="text"
                size="small"
                label="Update History"
                onClick={handleUpdateHistory}
                disabled={isUpdatingHistory}
            />
        </HistoryContainer>
    );
};

const HistoryContainer = styled.div`
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
