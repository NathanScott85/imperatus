import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';
import { Input } from '../../../components/input';
import { useDiscountCodesContext } from '../../../context/discount';
import { useCheckoutContext } from '../../../context/checkout';
import { useBasketContext } from '../../../context/basket';

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
    const { isFirstOrder } = useCheckoutContext();
    const { discountCodes, fetchDiscountCodes } = useDiscountCodesContext();
    const {
        discountCode,
        setDiscountCode,
        discountValue,
        setDiscountValue,
        discountApplied,
        setDiscountApplied,
    } = useBasketContext();
    const [discountError, setDiscountError] = useState('');
    const [appliedCode, setAppliedCode] = useState<null | {
        code: string;
        value: number;
        type: string;
    }>(null);

    useEffect(() => {
        fetchDiscountCodes();
    }, [fetchDiscountCodes]);

    const subtotalNumber = parseFloat(calculateSubtotal());
    const autoFirstOrderDiscount = isFirstOrder
        ? parseFloat((subtotalNumber * 0.05).toFixed(2))
        : discountValue;

    const handleApplyDiscount = () => {
        if (isFirstOrder) {
            setDiscountError('5% first-order discount already applied.');
            setTimeout(() => setDiscountError(''), 5000);
            return;
        }

        if (discountApplied) {
            setDiscountError('Only one discount code can be applied.');
            setTimeout(() => setDiscountError(''), 5000);
            return;
        }

        const found = discountCodes.find((d) => {
            const expiry = d.expiresAt ? new Date(Number(d.expiresAt)) : null;
            return (
                d.code.toLowerCase() === discountCode.trim().toLowerCase() &&
                d.active &&
                (!expiry || expiry > new Date())
            );
        });

        if (found) {
            const value =
                found.type === 'percentage'
                    ? (found.value / 100) * subtotalNumber
                    : found.value;
            setDiscountValue(Math.min(value, subtotalNumber));
            setAppliedCode(found);
            setDiscountApplied(true);
            setDiscountError('');
        } else {
            setDiscountValue(0);
            setAppliedCode(null);
            setDiscountApplied(false);
            setDiscountError('Code expired or is invalid.');
            setTimeout(() => setDiscountError(''), 5000);
        }
    };

    const handleRemoveDiscount = () => {
        setDiscountCode('');
        setDiscountValue(0);
        setDiscountApplied(false);
        setDiscountError('');
        setAppliedCode(null);
    };

    const discountedSubtotal = Math.max(
        subtotalNumber - autoFirstOrderDiscount,
        0,
    ).toFixed(2);

    return (
        <SummaryContainer>
            <h2>Order Summary</h2>
            {isFirstOrder && (
                <Banner>
                    🎉 5% discount will be applied automatically at <br />
                    checkout for your first order.
                </Banner>
            )}
            {discountApplied && appliedCode && (
                <Banner>
                    🎉 {appliedCode.code} discount code <br /> will be applied
                    at checkout.
                </Banner>
            )}
            <Details>
                <p>
                    <span>Total Items:</span>
                    <span>{basketProductsLength}</span>
                </p>
                <p>
                    <span>Subtotal:</span>
                    <span>£{calculateSubtotal()}</span>
                </p>
                <p>
                    <span>Discount:</span>
                    <span>
                        £{autoFirstOrderDiscount.toFixed(2)}
                        {appliedCode &&
                            autoFirstOrderDiscount < appliedCode.value &&
                            ` (of £${appliedCode.value.toFixed(2)})`}
                    </span>
                </p>
                <p>
                    <span>Subtotal (Discounted):</span>
                    <span>£{discountedSubtotal}</span>
                </p>
                <p>
                    <span>VAT:</span>
                    <span>£{calculateVat()}</span>
                </p>
                <p>
                    <span>Price without VAT:</span>
                    <span>£{calculatePriceWithoutVAT()}</span>
                </p>
                <p>
                    <span>Total (inc VAT):</span>
                    <span>£{calculateTotal()}</span>
                </p>

                {!isFirstOrder && (
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
                                onChange={(e) =>
                                    setDiscountCode(e.target.value)
                                }
                            />
                            {discountApplied ? (
                                <Button
                                    label="Remove"
                                    size="small"
                                    variant="secondary"
                                    onClick={handleRemoveDiscount}
                                />
                            ) : (
                                <Button
                                    label="Apply"
                                    size="small"
                                    variant="primary"
                                    onClick={handleApplyDiscount}
                                />
                            )}
                        </InputRow>
                        {discountError && (
                            <ErrorText>{discountError}</ErrorText>
                        )}
                    </DiscountWrapper>
                )}
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

const Banner = styled.div`
    background: #4d3c7b;
    color: #c79d0a;
    padding: 0.75rem;
    font-size: 1.2rem;
    font-family: Cinzel, sans-serif;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    border-radius: 3px;
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
        font-size: 1rem;
        font-weight: bold;
        font-family: Cinzel, sans-serif;
        color: #c79d0a;

        &::placeholder {
            font-size: 1rem;
            font-weight: bold;
            color: #c79d0a;
        }
    }
`;

const ErrorText = styled.span`
    color: red;
    font-size: 1rem;
    font-weight: bold;
    font-family: Cinzel, serif;
    margin-top: 0.5rem;
`;
