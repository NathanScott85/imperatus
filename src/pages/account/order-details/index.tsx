import React from 'react';
import styled from 'styled-components';
import StatusTag from '../../../components/status';
import { Order, OrderItem } from '../../../context/orders';
import { ArrowDown } from '../../../components/svg/arrow';

interface OrderDetailsProps {
    order: Order;
    onBack: () => void;
}

export const OrderDetails = ({ order, onBack }: OrderDetailsProps) => {
    return (
        <OrderDetailsContainer>
            <OrderHeaderContainer>
                <BackButton onClick={onBack}>
                    <ArrowDown type="small" fill="#c79d0a" /> Back to Orders
                </BackButton>
                <OrderTitle>Order Details</OrderTitle>
            </OrderHeaderContainer>

            <OrderDetailsWrapper>
                <OrderDetail>
                    <strong>Order Number:</strong> {order.orderNumber}
                </OrderDetail>

                <ProductsWrapper>
                    {order.items?.map((item: OrderItem, index: number) => (
                        <React.Fragment key={index}>
                            {item.product?.name && (
                                <OrderDetail>
                                    <strong>Product Name:</strong>{' '}
                                    {item.product.name}
                                </OrderDetail>
                            )}

                            {item.product?.set?.setName && (
                                <OrderDetail>
                                    <strong>Set:</strong>{' '}
                                    {item.product.set.setName}
                                </OrderDetail>
                            )}

                            {item.product?.rarity?.name && (
                                <OrderDetail>
                                    <strong>Rarity:</strong>{' '}
                                    {item.product.rarity.name}
                                </OrderDetail>
                            )}

                            {item.quantity !== undefined && (
                                <OrderDetail>
                                    <strong>Quantity:</strong> {item.quantity}
                                </OrderDetail>
                            )}

                            {item.price !== undefined && (
                                <OrderDetail>
                                    <strong>Price Per Item:</strong> £
                                    {item.price.toFixed(2)}
                                </OrderDetail>
                            )}
                        </React.Fragment>
                    ))}
                </ProductsWrapper>

                <OrderDetail>
                    <strong>Order Date:</strong>{' '}
                    {new Date(Number(order.createdAt)).toLocaleDateString()}
                </OrderDetail>

                <OrderDetail>
                    <strong>Status:</strong>
                    <StatusTag status={order.status} />
                </OrderDetail>

                <OrderDetail>
                    <strong>Order Subtotal:</strong> £
                    {order.subtotal?.toFixed(2)}
                </OrderDetail>

                <OrderDetail>
                    <strong>Shipping:</strong> £{order.shippingCost?.toFixed(2)}
                </OrderDetail>

                <OrderDetail>
                    <strong>Total:</strong> £{order.total?.toFixed(2)}
                </OrderDetail>
            </OrderDetailsWrapper>
        </OrderDetailsContainer>
    );
};

const OrderHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`;

const OrderDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #c79d0a;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 1rem;
    text-align: left;
    svg {
        margin-right: 0.5rem;
        color: #c79d0a;
        transform: rotate(90deg);
        vertical-align: middle;
    }
    &:hover {
        text-decoration: underline;
    }
`;

const OrderDetailsWrapper = styled.div`
    background-color: #160d35;
    padding: 2rem;
    border-radius: 8px;
    color: white;
    border: 1px solid #ac8fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ProductsWrapper = styled.div`
    margin: 1rem 0;
    overflow-y: auto;
    max-height: 300px;
    scrollbar-width: thin;
    scrollbar-color: #c79d0a transparent;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #c79d0a;
        border-radius: 4px;
    }
`;

const OrderTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    margin-right: auto;
    padding-left: 0.5rem;
    text-align: left;
`;

const OrderDetail = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    strong {
        color: #c79d0a;
        font-size: 16px;
        padding-right: 0.5rem;
    }
`;
