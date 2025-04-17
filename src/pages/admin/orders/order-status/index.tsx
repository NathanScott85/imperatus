import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useOrdersContext } from '../../../../context/orders';
import { Search } from '../../../../components/search';
import { FancyContainer } from '../../../../components/fancy-container';
import { OrderStatusDetail } from './status';

export const OrderStatus = () => {
    const {
        orderStatus,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        totalPages,
        fetchOrderStatus,
    } = useOrdersContext();

    const [selectedStatus, setSelectedStatus] = useState<any | null>(null);

    useEffect(() => {
        fetchOrderStatus();
    }, [fetchOrderStatus]);

    const handleViewStatus = (status: {
        id: number;
        value: string;
        label: string;
    }) => {
        setSelectedStatus(status);
    };

    const triggerSearch = () => {
        setSearch(search);
    };

    const handleReset = () => {
        setSearch('');
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (!loading && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleBackToList = () => {
        setSelectedStatus(null);
    };

    if (selectedStatus) {
        return (
            <OrderStatusDetail
                onBack={handleBackToList}
                status={selectedStatus}
            />
        );
    }

    return (
        <Container>
            <TitleRow>
                <Title>Order Statuses</Title>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Status..."
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>

            {orderStatus?.length !== 0 ? (
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Label</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <CenteredCell colSpan={3}>
                                        Loading...
                                    </CenteredCell>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <CenteredCell colSpan={3}>
                                        Error: {error.message}
                                    </CenteredCell>
                                </tr>
                            ) : (
                                orderStatus.map(
                                    (status: any, index: number) => (
                                        <TableRow
                                            key={status.id}
                                            isOdd={index % 2 === 1}
                                        >
                                            <td>{status.value}</td>
                                            <td>{status.label}</td>
                                            <td>
                                                <ViewButton
                                                    onClick={() =>
                                                        handleViewStatus(status)
                                                    }
                                                >
                                                    View
                                                </ViewButton>
                                            </td>
                                        </TableRow>
                                    ),
                                )
                            )}
                        </tbody>
                    </Table>

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationControls>
                                <PageButton
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    Previous
                                </PageButton>
                                <span>
                                    Page {page} of {totalPages}
                                </span>
                                <PageButton
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page >= totalPages}
                                >
                                    Next
                                </PageButton>
                            </PaginationControls>
                        </Pagination>
                    )}
                </TableWrapper>
            ) : (
                <FancyContainerWrapper>
                    <FancyContainer type="small" size="small">
                        <NoResultsMessage>
                            {search ? (
                                <p>No results found for &quot;{search}&quot;</p>
                            ) : (
                                <p>No order statuses available.</p>
                            )}
                        </NoResultsMessage>
                    </FancyContainer>
                </FancyContainerWrapper>
            )}
        </Container>
    );
};

const Container = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const ViewButton = styled.button`
    background-color: #4d3c7b;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 5px;
    &:hover {
        background-color: #2a1f51;
    }
`;

const FancyContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const Title = styled.h2`
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

const TableWrapper = styled.div`
    margin-top: 1rem;
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

    td:hover,
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const PaginationControls = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ disabled }) => (disabled ? '#999' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;

const NoResultsMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;
    width: 100%;

    p {
        color: white;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        padding: 6rem;
    }
`;
