import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';
import { Input } from '../../../components/input';

interface OrderSummaryProps {
    basketProductsLength: number;
    calculateSubtotal: () => string;
    calculatePriceWithoutVAT: () => string;
    calculateTotal: () => string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    basketProductsLength,
    calculateSubtotal,
    calculatePriceWithoutVAT,
    calculateTotal,
}) => {
    const [discountCode, setDiscountCode] = useState('');

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
                    <span>Delivery:</span>
                    <span>$5.00</span>
                </p>
                <p>
                    <span>VAT:</span>
                    <span>
                        ${(parseFloat(calculateSubtotal()) * 0.2).toFixed(2)}
                    </span>
                </p>
                <p>
                    <span>Price without VAT:</span>
                    <span>${calculatePriceWithoutVAT()}</span>
                </p>
                <p>
                    <span>Total (inc VAT):</span>
                    <span>${calculateTotal()}</span>
                </p>

                <DiscountWrapper>
                    <p>Have a discount code?</p>
                    <InputRow>
                        <Input
                            type="text"
                            placeholder="Enter discount code"
                            size="small"
                            variant="secondary"
                            label="Enter discount code"
                            name="discountCode"
                            id="discountCode"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <Button
                            label="Apply"
                            size="small"
                            variant="primary"
                            onClick={() => {}}
                        />
                    </InputRow>
                </DiscountWrapper>

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

const DiscountWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0;

    p {
        margin: 0 0 0.5rem 0;
        font-family: Cinzel, sans-serif;
        font-size: 14px;
        font-weight: bold;
        color: #c79d0a;
    }
`;

const InputRow = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    input {
        max-width: 200px;
        padding: 0.3rem 0.5rem;
        font-size: 0.85rem;
        font-family: Cinzel, sans-serif;
        font-size: 14px;
        color: #c79d0a;
    }
`;
