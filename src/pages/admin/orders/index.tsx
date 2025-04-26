import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Order as OrderContextProps,
    useOrdersContext,
} from '../../../context/orders';
import { Search } from '../../../components/search';
import { FancyContainer } from '../../../components/fancy-container';
import { DeliveryModal } from './order-modal';
import { Order } from './order';
import moment from 'moment';
import StatusTag from '../../../components/status';

type DeliveryInfo = Pick<
    OrderContextProps,
    'name' | 'address' | 'city' | 'postcode' | 'phone' | 'email'
>;

export const Orders = () => {
    const {
        orders,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        totalPages,
        fetchOrders,
    } = useOrdersContext();

    const [selectedOrder, setSelectedOrder] =
        useState<OrderContextProps | null>(null);
    const [selectedDelivery, setSelectedDelivery] =
        useState<DeliveryInfo | null>(null);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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

    const handleViewOrder = (order: OrderContextProps) => {
        setSelectedOrder(order);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
    };

    if (selectedOrder) {
        return <Order order={selectedOrder} onBack={handleBackToList} />;
    }
    console.log(orders, 'orders');
    return (
        <OrdersContainer>
            <TitleRow>
                <OrdersTitle>Orders</OrdersTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Orders..."
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>

            {orders?.length !== 0 ? (
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>First Order</th>
                                <th>Subtotal</th>
                                <th>Total & Shipping</th>
                                <th>VAT</th>
                                <th>Discount Code</th>
                                <th>Date</th>
                                <th>
                                    Delivery <br />
                                    Information
                                </th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <CenteredCell colSpan={10}>
                                        Loading...
                                    </CenteredCell>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <CenteredCell colSpan={10}>
                                        Error: {error.message}
                                    </CenteredCell>
                                </tr>
                            ) : (
                                orders.map((order, index) => (
                                    <TableRow
                                        key={order.id}
                                        isOdd={index % 2 === 1}
                                    >
                                        <td>{order.orderNumber}</td>
                                        <td>{order.name || '—'}</td>
                                        <td>
                                            <StatusTag status={order.status} />
                                        </td>
                                        <FirstOrderCell
                                            $first={order.firstOrder}
                                        >
                                            {order.firstOrder ? 'YES' : 'NO'}
                                        </FirstOrderCell>

                                        <td>
                                            £{(order.subtotal || 0).toFixed(2)}
                                        </td>

                                        <td>
                                            £{(order.total || 0).toFixed(2)}
                                        </td>
                                        <td>£{(order.vat || 0).toFixed(2)}</td>
                                        <td>
                                            {order.discountCode?.code || '-'}
                                        </td>
                                        <td>
                                            {order.createdAt &&
                                            moment(
                                                Number(order.createdAt),
                                            ).isValid()
                                                ? moment(
                                                      Number(order.createdAt),
                                                  ).format('DD-MM-YYYY')
                                                : '—'}
                                        </td>
                                        <td>
                                            <ViewButton
                                                onClick={() =>
                                                    setSelectedDelivery(order)
                                                }
                                            >
                                                View
                                            </ViewButton>
                                        </td>
                                        <td>
                                            <ViewButton
                                                onClick={() =>
                                                    handleViewOrder(order)
                                                }
                                            >
                                                View
                                            </ViewButton>
                                        </td>
                                    </TableRow>
                                ))
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
                                <p>No orders placed at the moment</p>
                            )}
                        </NoResultsMessage>
                    </FancyContainer>
                </FancyContainerWrapper>
            )}
            <DeliveryModal
                delivery={selectedDelivery}
                onClose={() => setSelectedDelivery(null)}
            />
        </OrdersContainer>
    );
};

const OrdersContainer = styled.div`
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

const FirstOrderCell = styled.td<{ $first: boolean }>`
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ $first }) => ($first ? '#4CAF50' : '#FF4D4F')};
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

const OrdersTitle = styled.h2`
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
