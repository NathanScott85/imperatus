import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';

interface OrderSummaryProps {
    basketProductsLength: number;
    calculateSubtotal: () => string;
    calculatePriceWithoutVAT: () => string;
    calculateTotal: () => string;
    calculateVat: () => string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    basketProductsLength,
    calculateSubtotal,
    calculateVat,
    calculatePriceWithoutVAT,
    calculateTotal,
}) => {
    return (
        <SummaryContainer>
            <h2>Order Summary</h2>
            <Details>
                <p>
                    <span>Total Items:</span>
                    <span>{basketProductsLength}</span>
                </p>
                <p>
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal()}</span>
                </p>
                <p>
                    <span>VAT:</span>
                    <span>£{calculateVat()}</span>
                </p>
                <p>
                    <span>Price without VAT:</span>
                    <span>${calculatePriceWithoutVAT()}</span>
                </p>
                <p>
                    <span>Total (inc VAT):</span>
                    <span>${calculateTotal()}</span>
                </p>
                <Button
                    link
                    pathname="/shop/checkout"
                    label="Next: Checkout"
                    size="small"
                    variant="secondary"
                />
            </Details>
        </SummaryContainer>
    );
};

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-width: 250px;
    flex: 1;
    font-family: Barlow, sans-serif;
    font-weight: bold;
    padding: 2rem;
    border-radius: 8px;
    border: 2px solid #4d3c7b;
    background-color: #130a30;
    color: #c79d0a;
    min-height: 550px;

    h2 {
        font-family: Cinzel, sans-serif;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
    }

    p {
        font-family: Cinzel, sans-serif;
        margin: 5px 0;
        font-size: 12px;
        color: white;
    }
`;

const Details = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-end;
    width: 100%;
    min-width: 250px;

    p {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 0.5rem;
        min-height: 1.5rem;
        font-size: 1.2rem;
        font-family: Barlow, sans-serif;
    }

    p span:first-child {
        text-align: left;
        color: #c79d0a;
        font-weight: bold;
        font-size: 1.2rem;
        font-family: Cinzel, sans-serif;
    }

    p span:last-child {
        text-align: right;
        color: #ffffff;
        font-weight: bold;
        font-size: 1.2rem;
        font-family: Cinzel, sans-serif;
    }
`;
