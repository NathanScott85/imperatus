import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';
import { useOrdersContext } from '../../../context/orders';
import { useAppContext } from '../../../context';
import StatusTag from '../../../components/status';
import { Order } from '../../../context/orders';
import { mediaQueries } from '../../../styled/breakpoints';
import { FancyContainer } from '../../../components/fancy-container';
import Pagination from '../../../components/pagination';

interface OrderHistoryProps {
    onViewOrder: (order: Order | null) => void;
}

export const OrderHistory = ({ onViewOrder }: OrderHistoryProps) => {
    const { orders, fetchUserOrders, currentPage, totalPages } =
        useOrdersContext();
    const { user } = useAppContext();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (user?.email && !hasFetched.current) {
            fetchUserOrders({ email: user.email, page: 1, limit: 3 });
            hasFetched.current = true;
        }
    }, [user, fetchUserOrders]);

    return (
        <OrderHistoryContainer>
            <h3>Order History</h3>
            <OrderList>
                {orders.length === 0 ? (
                    <FancyContainer variant="medium" size="medium">
                        <FancyContainerSubWrapper>
                            <p>You haven&apos;t placed any orders yet.</p>
                            <p>
                                When you do, they&apos;ll show up here for easy
                                tracking and access.
                            </p>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                ) : (
                    orders.map((order) => (
                        <OrderItem key={order.orderNumber}>
                            <OrderInfo>
                                <OrderDetails>
                                    <strong>Quantity:</strong>{' '}
                                    {order.items?.length || 0}
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>Date:</strong>{' '}
                                    {new Date(
                                        Number(order.createdAt),
                                    ).toLocaleDateString()}
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>Order #</strong> {order.orderNumber}
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>Total:</strong> £
                                    {order.total.toFixed(2)}
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>Status:</strong>{' '}
                                    <StatusTag status={order.status} />
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>First Order:</strong>{' '}
                                    <FirstOrder $first={order.firstOrder}>
                                        {order.firstOrder ? 'YES' : 'NO'}
                                    </FirstOrder>
                                </OrderDetails>
                                <OrderDetails>
                                    <strong>Shipping:</strong> £
                                    {order.shippingCost.toFixed(2)}
                                </OrderDetails>
                            </OrderInfo>
                            <OrderActions>
                                <Button
                                    label="View Order"
                                    variant="text"
                                    onClick={() => onViewOrder(order)}
                                />
                                <Button label="Track Order" variant="text" />
                            </OrderActions>
                        </OrderItem>
                    ))
                )}
            </OrderList>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) =>
                    fetchUserOrders({ email: user?.email, page, limit: 3 })
                }
            />
        </OrderHistoryContainer>
    );
};

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    p {
        margin: 1rem;
        font-family: 'Barlow', sans-serif;
        font-size: 14px;
        color: white;
    }
    z-index: 10;
`;

const OrderHistoryContainer = styled.div`
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
    width: 100%;
`;

const OrderList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
`;

const OrderItem = styled.div`
    background-color: #160d35;
    padding: 0.75rem;
    border-radius: 8px;
    color: white;
    border: 1px solid #ac8fff;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 14px;

    ${mediaQueries('sm')`
        width: 100%;
        min-width: 325px;
        height: auto;
    `};

    ${mediaQueries('md')`
        width: calc(50% - 0.5rem);
        min-width: 400px;
        height: auto;
    `};

    ${mediaQueries('lg')`
        width: calc(33.3333% - 0.67rem);
        min-width: 350px;
        height: auto;
    `};

    ${mediaQueries('xl')`
        width: calc(33.3333% - 0.67rem);
        height: auto;
    `};
`;

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    width: 100%;

    strong {
        color: #c79d0a;
        font-size: 16px;
    }
`;

const FirstOrder = styled.div<{ $first: boolean }>`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    padding-left: 0.2rem;
    color: ${({ $first }) => ($first ? '#4CAF50' : '#FF4D4F')};
`;

const OrderDetails = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: row;
    strong {
        padding-right: 0.5rem;
    }
`;

const OrderActions = styled.div`
    margin-top: auto;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
`;
