import React, { useEffect, useState, useDeferredValue } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useVatContext } from '../../../context/vat';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import StatusTag from '../../../components/status';
import Pagination from '../../../components/pagination';

export const AdminVAT = () => {
    const {
        vatRecords,
        fetchVatRecords,
        loading,
        error,
        totalPages,
        setPage,
        page,
        setSearch,
        limit,
    } = useVatContext();

    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);

    useEffect(() => {
        setSearch(deferredSearchQuery);
        fetchVatRecords();
    }, [deferredSearchQuery, fetchVatRecords, setSearch, limit]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <VATContainer>
            <TitleRow>
                <VATTitle>VAT Records</VATTitle>
                <SearchContainer>
                    <StyledInput
                        variant="secondary"
                        size="small"
                        placeholder="Search VAT records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <ClearButton onClick={() => setSearchQuery('')}>
                            ✕
                        </ClearButton>
                    )}
                </SearchContainer>
            </TitleRow>

            {vatRecords?.length !== 0 ? (
                <VATWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Status</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                <th>VAT</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <CenteredCell colSpan={5}>
                                        Loading...
                                    </CenteredCell>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <CenteredCell colSpan={5}>
                                        Error: {error.message}
                                    </CenteredCell>
                                </tr>
                            ) : (
                                vatRecords.map((record, index) => (
                                    <TableRow
                                        key={record.id}
                                        isOdd={index % 2 === 1}
                                    >
                                        <td>{record.orderNumber}</td>
                                        <td>
                                            {' '}
                                            <StatusTag status={record.status} />
                                        </td>
                                        <td>£{record.subtotal.toFixed(2)}</td>
                                        <td>£{record.total.toFixed(2)}</td>
                                        <td>£{record.vatAmount.toFixed(2)}</td>
                                        <td>
                                            {record.createdAt &&
                                            moment(
                                                Number(record.createdAt),
                                            ).isValid()
                                                ? moment(
                                                      Number(record.createdAt),
                                                  ).format('DD-MM-YYYY')
                                                : '—'}
                                        </td>
                                    </TableRow>
                                ))
                            )}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </VATWrapper>
            ) : (
                <FancyContainer>
                    <NoVATMessage>
                        {searchQuery ? (
                            <p>
                                No results found for &quot;{searchQuery}&quot;
                            </p>
                        ) : (
                            <p>No VAT records available at the moment.</p>
                        )}
                    </NoVATMessage>
                </FancyContainer>
            )}
        </VATContainer>
    );
};
const VATContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
    p {
        font-size: 16px;
        color: white;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const VATTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    max-width: 325px;
    width: 100%;
`;

const StyledInput = styled(Input)`
    margin-left: auto;
    max-width: 300px;
    border-radius: 3px;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    z-index: 999;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: #c79d0a;
    }
`;

const VATWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #4d3c7b;
    background-color: #160d35;

    th,
    td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #4d3c7b;
        line-height: normal;
    }

    th {
        background-color: #4d3c7b;
        color: #fff;
        font-family: Cinzel;
        font-size: 14px;
        font-weight: bold;
    }

    td {
        color: white;
        font-family: Barlow;
        font-size: 14px;
    }

    tr:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }
`;

const TableRow = styled.tr<{ isOdd: boolean }>`
    background-color: ${({ isOdd }) => (isOdd ? '#1e1245' : '#160d35')};
`;

const CenteredCell = styled.td`
    text-align: center;
    color: #999;
    font-size: 14px;
    padding: 2rem 0;
`;

const NoVATMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;
    width: 100%;
    p {
        height: 100%;
        color: white;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        padding: 6rem;
    }
`;
