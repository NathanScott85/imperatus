import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';

interface Props {
    basket: {
        productId: number;
        name: string;
        price: number;
        quantity: number;
    }[];
    calculateSubtotal: () => string;
    calculateDiscount: () => number;
    calculateVAT: () => string;
    calculatePriceWithoutVAT: () => string;
    calculateTotal: () => string;
    onSubmit: () => void;
    isAuthenticated: boolean;
}

export const CheckoutSummary: React.FC<Props> = ({
    basket,
    calculateSubtotal,
    calculateDiscount,
    calculateVAT,
    calculatePriceWithoutVAT,
    calculateTotal,
    onSubmit,
    isAuthenticated,
}) => (
    <SummaryBox>
        <SummaryTitle>Your Order</SummaryTitle>
        {basket.map((item) => (
            <SummaryRow key={item.productId}>
                <span>
                    {item.name} x {item.quantity}
                </span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
            </SummaryRow>
        ))}
        <Divider />
        <SummaryRow>
            <span>Subtotal:</span>
            <span>£{calculateSubtotal()}</span>
        </SummaryRow>
        <SummaryRow>
            <span>Discount:</span>
            <span>£{calculateDiscount().toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
            <span>Subtotal (Discounted):</span>
            <span>
                £
                {(
                    parseFloat(calculateSubtotal()) - calculateDiscount()
                ).toFixed(2)}
            </span>
        </SummaryRow>
        <SummaryRow>
            <span>VAT:</span>
            <span>£{calculateVAT()}</span>
        </SummaryRow>
        <SummaryRow>
            <span>Price without VAT:</span>
            <span>£{calculatePriceWithoutVAT()}</span>
        </SummaryRow>
        <SummaryTotal>
            <span>Total to Pay:</span>
            <span>£{calculateTotal()}</span>
        </SummaryTotal>
        <ButtonWrapper>
            {isAuthenticated ? (
                <Button
                    onClick={onSubmit}
                    variant="primary"
                    size="small"
                    label="Confirm Order"
                />
            ) : (
                <PromptText>You must log in to complete checkout.</PromptText>
            )}
        </ButtonWrapper>
    </SummaryBox>
);

const SummaryBox = styled.div`
    background-color: #130a30;
    padding: 20px;
    border-radius: 8px;
    color: white;
    border: 2px solid #4d3c7b;
`;

const SummaryTitle = styled.h2`
    font-family: Cinzel;
    font-size: 20px;
    margin-bottom: 10px;
    color: #c79d0a;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #4d3c7b;
    margin: 1rem 0;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 5rem;
    margin-top: 20px;

    span:first-child {
        color: #c79d0a;
        font-size: 1.2rem;
        font-weight: bold;
        font-family: Cinzel, sans-serif;
    }
    span:last-child {
        color: #ffffff;
        font-size: 1.2rem;
        font-family: Cinzel, sans-serif;
    }

    span:last-child {
        color: #ffffff;
        font-family: Cinzel, sans-serif;
    }
    span:last-child:hover {
        color: #c79d0a;
    }
`;

const SummaryTotal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
    span:first-child {
        font-family: Cinzel;
        color: #c79d0a;
        font-size: 1.5rem;
        font-weight: bold;
    }
    span:last-child {
        color: #ffffff;
        font-family: Cinzel;
        font-size: 1.2rem;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const PromptText = styled.div`
    color: #c79d0a;
    font-family: Cinzel, sans-serif;
    font-size: 14px;
    font-weight: bold;
    margin-top: 0.5rem;
`;
