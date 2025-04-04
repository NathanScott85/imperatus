import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Product {
    id: number;
    category: { name: string };
    game: string;
    name: string;
    img: string;
    price: number;
    type: string;
    rrp: number;
    stock: {
        amount: number;
        sold: number;
        instock: string;
        soldout: string;
        preorder?: boolean;
    };
}

interface SingleOrderProps {
    month: string;
    total: number;
    products: Product[];
}

interface OrderProps {
    order: SingleOrderProps;
    previousOrder?: SingleOrderProps;
}

const Order: React.FC<OrderProps> = ({ order, previousOrder }: OrderProps) => {
    const [increase, setIncrease] = useState<number | null>(null);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [previousTotalValue, setPreviousTotalValue] = useState<number>(0);

    useEffect(() => {
        if (previousOrder) {
            const increaseAmount = order.total - previousOrder.total;
            setIncrease(increaseAmount);

            // Calculate the total value for the previous month
            const previousTotalPrice = previousOrder.products.reduce(
                (acc, product) => {
                    return acc + product.price;
                },
                0,
            );
            setPreviousTotalValue(previousTotalPrice);
        }

        // Calculate the total value for the current month
        const totalPrice = order.products.reduce((acc, product) => {
            return acc + product.price;
        }, 0);
        setTotalValue(totalPrice);
    }, [order, previousOrder]);

    return (
        <OrderContainer>
            <OrderTitle>Total Orders</OrderTitle>
            <OrderValue>
                Orders for {order?.month}: <strong>{order?.total}</strong>
            </OrderValue>
            <TotalValue>
                Total value: <strong>${totalValue.toFixed(2)}</strong>
            </TotalValue>
            {increase !== null && (
                <>
                    <OrderIncrease increase={(increase > 0).toString()}>
                        {increase > 0 ? (
                            <>Difference: {increase}</>
                        ) : (
                            <OrderDifferenceContainer>
                                <OrderDifferenceContent>
                                    Difference: {increase}
                                </OrderDifferenceContent>
                                <OrderDifferenceContent>
                                    Previous month:
                                </OrderDifferenceContent>
                                <OrderDifferenceContent>
                                    {previousOrder?.month}:{' '}
                                    {previousOrder?.total}
                                </OrderDifferenceContent>
                            </OrderDifferenceContainer>
                        )}
                    </OrderIncrease>
                    <PreviousTotalValue>
                        Previous months total:
                        <strong>${previousTotalValue.toFixed(2)}</strong>
                    </PreviousTotalValue>
                </>
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
        <OrderListContainer>
            {orders.map((order, index) => {
                if (order?.month === currentMonth) {
                    return (
                        <Order
                            key={order?.month}
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
        </OrderListContainer>
    );
};

const OrderDifferenceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderDifferenceContent = styled.span`
    color: #e74949;
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0.25rem;
`;

const OrderContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding: 20px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    margin: 20px auto;
    background-color: #130a30;
    text-align: center;
`;

const OrderTitle = styled.h3`
    color: #130a30;
    font-family: Cinzel;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    margin-bottom: 10px;
    color: white;
`;

const OrderValue = styled.div`
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
    strong {
        font-size: 18px;
    }
`;

const TotalValue = styled.div`
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
    strong {
        font-size: 18px;
    }
`;

const PreviousTotalValue = styled.div`
    font-size: 18px;
    color: white;
    margin-top: 10px;
    strong {
        font-size: 18px;
    }
`;

const OrderIncrease = styled.div<{ increase: string }>`
    color: ${(props) => (props.increase === 'true' ? '#15B170' : '#E74949')};
    font-size: 14px;
    margin-top: 5px;
`;

const OrderListContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
