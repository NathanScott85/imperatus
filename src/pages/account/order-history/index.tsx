import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';

const orders = [
    {
        orderNumber: '123456789',
        id: '',
        productId: 'YGO-MTIN-2022',
        dateTime: '2023-08-09',
        productName: 'Yugioh Mega Tin 2022',
        time: '14:30',
        quantity: '3',
        total: '£89.99',
        status: 'Completed',
        delivery: 'Delivered on',
        deliveryDate: '2023-08-12',
        productLink: '',
    },
    {
        orderNumber: '123456789',
        id: '',
        productId: 'YGO-MTIN-2022',
        dateTime: '2023-08-09',
        productName: 'Yugioh Mega Tin 2022',
        time: '14:30',
        quantity: '3',
        total: '£89.99',
        status: 'Shipped',
        delivery: 'Estimated delivery',
        deliveryDate: ' 2023-07-20',
        productLink: '',
    },
    {
        orderNumber: '123456789',
        id: '',
        productId: 'YGO-MTIN-2022',
        dateTime: '2023-08-09',
        productName: 'Yugioh Mega Tin 2022',
        time: '14:30',
        quantity: '3',
        total: '£89.99',
        status: 'Pending',
        delivery: 'Awaiting Shipment',
        deliveryDate: '2023-08-12',
        productLink: '',
    },
];

export const OrderHistory = ({ onViewOrder }: any) => {
    return (
        <OrderHistoryContainer>
            <h3>Order History</h3>
            <OrderList>
                {orders.map((order, index) => (
                    <OrderItem key={index}>
                        <OrderInfo>
                            <Summary>
                                <strong>Quantity: </strong> {order.quantity}{' '}
                            </Summary>
                            <DateTime>
                                <strong>Date:</strong> {order.dateTime}
                            </DateTime>
                            <OrderNumber>
                                <strong>Order #</strong> {order.orderNumber}
                            </OrderNumber>
                            <Total>
                                <strong>Order Total: </strong> {order.total}
                            </Total>
                            <StatusContainer>
                                <strong> Status: </strong>
                                <Status status={order.status}>
                                    {order.status}
                                </Status>
                            </StatusContainer>

                            <Delivery>
                                <strong>{order.delivery}:</strong>
                                {order.delivery === 'Awaiting Shipment'
                                    ? 'TBC'
                                    : order.deliveryDate}
                            </Delivery>
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
                ))}
            </OrderList>
        </OrderHistoryContainer>
    );
};
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
`;

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const OrderItem = styled.div`
    background-color: #160d35;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border: 1px solid #ac8fff;
`;

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    color: white;
    strong {
        color: #c79d0a;
        font-size: 16px;
    }
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    width: 325px;
`;

const Summary = styled.div`
    font-size: 16px;
`;

const DateTime = styled.div`
    font-size: 14px;
`;

const OrderNumber = styled.div`
    font-size: 14px;
`;

const Total = styled.div`
    font-size: 16px;
`;

const getStatusColor = (status: any) => {
    switch (status) {
        case 'Pending':
            return '#FFA500'; // A brighter orange for better contrast
        case 'Completed':
            return '#32CD32'; // A bright green (LimeGreen) for better visibility
        case 'Shipped':
            return '#1E90FF'; // DodgerBlue for strong contrast
        case 'Awaiting Shipment':
            return '#FFD700'; // Bright yellow (Gold) for better visibility
        case 'Declined':
            return '#FF4500'; // OrangeRed for strong contrast
        case 'Refunded':
            return '#8A2BE2'; // BlueViolet for better visibility
        case 'Disputed':
            return '#DC143C'; // Crimson for better contrast
        default:
            return 'white'; // Default to white if status is unknown
    }
};

const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
`;

const Status = styled.div<{ status: any }>`
    font-size: 14px;
    font-weight: bold;
    padding: 0.2rem;
    color: ${(props) => getStatusColor(props.children)};
`;

const Delivery = styled.div`
    font-size: 14px;
`;

const OrderActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
