import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SingleOrderProps {
    month: string;
    value: number;
}

interface OrderProps {
    order: SingleOrderProps;
    previousOrder?: SingleOrderProps;
}

const Order: React.FC<OrderProps> = ({ order, previousOrder }: OrderProps) => {
    const [increase, setIncrease] = useState<number | null>(null);

    useEffect(() => {
        if (previousOrder) {
            const increaseAmount = order.value - previousOrder.value;
            setIncrease(increaseAmount);
        }
    }, [order, previousOrder]);

    return (
        <OrderContainer>
            <OrderTitle>Orders for {order.month}</OrderTitle>
            <OrderValue>{order.value}</OrderValue>
            {increase !== null && (
                <OrderIncrease increase={(increase > 0).toString()}>
                    {increase}
                </OrderIncrease>
            )}
        </OrderContainer>
    );
};

interface OrderListProps {
    orders: SingleOrderProps[];
    currentMonth: string;
}

export const OrderList: React.FC<OrderListProps> = ({
    orders,
    currentMonth,
}) => {
    return (
        <div>
            {orders.map((order, index) => {
                if (order.month === currentMonth) {
                    return (
                        <Order
                            key={order.month}
                            order={order}
                            previousOrder={
                                index > 0 ? orders[index - 1] : undefined
                            }
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

const OrderContainer = styled.div`
    width: 300px;
    border-radius: 4px;
    padding: 15px;
    margin: 10px;
    border: 1px solid #4d3c7b;
    background-color: #fff;
`;

const OrderTitle = styled.h3`
    margin-bottom: 10px;
    color: black;
`;

const OrderValue = styled.div`
    font-size: 18px;
    color: black;
`;

const OrderIncrease = styled.div<{ increase: string }>`
    color: ${(props) => (props.increase === 'true' ? 'green' : 'red')};
    font-size: 14px;
    margin-top: 5px;
`;
