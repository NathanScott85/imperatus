import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import Button from '../../../../../components/button'; // Import Button component

const GET_STORE_CREDIT_HISTORY = gql`
    query StoreCreditHistory($userId: Int!, $limit: Int!, $offset: Int!) {
        storeCreditHistory(userId: $userId, limit: $limit, offset: $offset) {
            transactions {
                date
                time
                type
                amount
                balanceAfter
            }
            totalCount
        }
    }
`;

interface StoreCreditHistoryProps {
    userId: number;
}

export const StoreCreditHistory: React.FC<StoreCreditHistoryProps> = ({
    userId,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const { loading, error, data, refetch } = useQuery(
        GET_STORE_CREDIT_HISTORY,
        {
            variables: {
                userId,
                limit,
                offset: (currentPage - 1) * limit,
            },
        },
    );

    const [formattedTransactions, setFormattedTransactions] = useState([]);
    const [isUpdatingHistory, setIsUpdatingHistory] = useState(false);

    useEffect(() => {
        if (data && data.storeCreditHistory) {
            const { transactions, totalCount } = data.storeCreditHistory;
            const formattedData = transactions.map((transaction: any) => ({
                ...transaction,
                formattedDate: moment(transaction.date).format('DD/MM/YYYY'),
                formattedTime: transaction.time,
            }));

            setFormattedTransactions(formattedData);
            setTotalPages(Math.ceil(totalCount / limit));
        }
    }, [data]);

    const handleUpdateHistory = async () => {
        setIsUpdatingHistory(true);
        await refetch();
        setIsUpdatingHistory(false);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading store credit history.</p>;

    return (
        <HistoryContainer>
            <HistoryHeader>
                <h2>Store Credit History</h2>
                <Button
                    variant="text"
                    size="small"
                    label="Update History"
                    onClick={handleUpdateHistory}
                    disabled={
                        isUpdatingHistory || formattedTransactions.length === 0
                    }
                />
            </HistoryHeader>
            {formattedTransactions.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                <>
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
                                            {transaction.type === 'credit'
                                                ? '+'
                                                : '-'}{' '}
                                            £{transaction.amount.toFixed(2)}
                                        </span>
                                    </span>
                                    <span>
                                        <strong>Balance:</strong>
                                        <span>
                                            £
                                            {transaction.balanceAfter.toFixed(
                                                2,
                                            )}
                                        </span>
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                    <PaginationControls>
                        <Button
                            variant="text"
                            size="small"
                            label="Previous"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        />
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="text"
                            label="Next"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationControls>
                </>
            )}
        </HistoryContainer>
    );
};

const HistoryHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    span {
        font-family: Barlow, sans-serif;
        font-size: 14px;
        color: #fff;
    }
`;

const HistoryContainer = styled.div`
    width: 300px;
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
