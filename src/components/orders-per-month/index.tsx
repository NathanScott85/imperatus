import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Order {
    month: string;
    value: number;
}

interface OrderProps {
    order: Order;
    previousOrder?: Order;
}

const Order: React.FC<OrderProps> = ({ order, previousOrder } : OrderProps) => {
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
                <OrderIncrease isIncrease={increase > 0}>{increase}</OrderIncrease>
            )}
        </OrderContainer>
    );
};

interface OrderListProps {
    orders: Order[];
    currentMonth: string;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, currentMonth }: OrderListProps) => {
    return (
      <div>
        {orders.map((order: any, index: number) => {
          if (order.month === currentMonth) {
            return (
              <Order
                key={order.month}
                order={order}
                previousOrder={index > 0 ? orders[index - 1] : undefined}
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
  border: 1px solid #4D3C7B;
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

const OrderIncrease = styled.div<{ isIncrease: boolean }>`
  color: ${(props) => (props.isIncrease ? 'green' : 'red')};
  font-size: 14px;
  margin-top: 5px;
`;