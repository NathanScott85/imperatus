import React from 'react';
import styled from 'styled-components';

export const OrderDetails = ({ order }: any) => {
    return (
        <OrderDetailsContainer>
            <OrderTitle>Order Details</OrderTitle>
            <OrderDetailsWrapper>
                <OrderDetail>
                    <strong>Order Number:</strong> {order.orderNumber}
                </OrderDetail>
                <OrderDetail>
                    <strong>Product Name:</strong> {order.productName}
                </OrderDetail>
                <OrderDetail>
                    <strong>Product ID:</strong> {order.productId}
                </OrderDetail>
                <OrderDetail>
                    <strong>Quantity:</strong> {order.quantity}
                </OrderDetail>
                <OrderDetail>
                    <strong>Order Date:</strong> {order.dateTime} at
                    {order.time}
                </OrderDetail>
                <OrderDetail>
                    <strong>Status:</strong> {order.status}
                </OrderDetail>
                <OrderDetail>
                    <strong>Total Amount:</strong> {order.total}
                </OrderDetail>
                <OrderDetail>
                    <strong>Delivery:</strong> {order.delivery}
                    {order.deliveryDate}
                </OrderDetail>
            </OrderDetailsWrapper>
        </OrderDetailsContainer>
    );
};
const OrderDetailsContainer = styled.div``;
// Styled components
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

const OrderTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    text-align: left;
`;

const OrderDetail = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    strong {
        color: #c79d0a;
        font-size: 16px;
    }
    width: 325px;
`;
