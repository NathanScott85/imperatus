import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Button from '../../components/button';
import { Input } from '../../components/input';
import { Link } from 'react-router-dom';
import { ArrowDown } from '../../components/svg/arrow';
import { useDiscountCodesContext } from '../../context/discount';
import { useBasketContext } from '../../context/basket';
import { useAppContext } from '../../context';
import { LoginSection } from './login-section';
import { GuestCheckout } from './guest-checkout';

export const Checkout = () => {
    const [discountCode, setDiscountCode] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [discountError, setDiscountError] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [appliedCode, setAppliedCode] = useState<null | {
        code: string;
        value: number;
        type: string;
    }>(null);

    const { discountCodes, fetchDiscountCodes } = useDiscountCodesContext();
    const { basket } = useBasketContext();
    const { user, isAuthenticated } = useAppContext();

    useEffect(() => {
        fetchDiscountCodes();
    }, []);

    const calculateSubtotal = (): string => {
        return basket
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const calculateVAT = (): string => {
        const subtotal = Math.max(
            parseFloat(calculateSubtotal()) - discountValue,
            0,
        );
        return (subtotal - subtotal / 1.2).toFixed(2);
    };

    const calculateTotal = (): string => {
        const discountedSubtotal = Math.max(
            parseFloat(calculateSubtotal()) - discountValue,
            0,
        );
        const vat = discountedSubtotal - discountedSubtotal / 1.2;
        const delivery = 5; // need to fix this later.
        const total = discountedSubtotal + vat + delivery;
        return Math.max(0, total).toFixed(2);
    };
    const handleRemoveDiscount = () => {
        setDiscountCode('');
        setDiscountValue(0);
        setDiscountApplied(false);
        setDiscountError('');
    };

    const handleApplyDiscount = () => {
        const found = discountCodes.find((d) => {
            const expiry = d.expiresAt ? new Date(Number(d.expiresAt)) : null;
            return (
                d.code.toLowerCase() === discountCode.trim().toLowerCase() &&
                d.active &&
                (!expiry || expiry > new Date())
            );
        });

        if (discountValue > 0) {
            setDiscountError('Only one discount code can be applied.');
            setTimeout(() => setDiscountError(''), 5000);
            return;
        }

        if (found) {
            const subtotal = parseFloat(calculateSubtotal());
            const value =
                found.type === 'percentage'
                    ? (found.value / 100) * subtotal
                    : found.value;

            setDiscountValue(Math.min(value, subtotal));
            setAppliedCode(found); // ✅ store for display
            setDiscountError('');
            setDiscountApplied(true);
        } else {
            setDiscountValue(0);
            setAppliedCode(null);
            setDiscountError('Code expired or is invalid.');
            setDiscountApplied(false);
            setTimeout(() => setDiscountError(''), 5000);
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Checkout" />
            <StyledMainContainer>
                <CenteredContainer>
                    <CheckoutCard>
                        <StyledLink to="/shop/basket">
                            <ArrowDown type="small" fill="#c79d0a" /> Back to
                            Basket
                        </StyledLink>
                        <h1>Checkout</h1>
                        <CheckoutGrid>
                            <LeftSection>
                                <>
                                    {user ? (
                                        <>
                                            <Section>
                                                <SectionTitle>
                                                    Email Address
                                                </SectionTitle>
                                                <StaticInfo>
                                                    {user.email}
                                                </StaticInfo>
                                            </Section>
                                            <Section>
                                                <SectionTitle>
                                                    Delivery Address
                                                </SectionTitle>
                                                <StaticInfo>
                                                    {user.fullname ||
                                                        'Not provided'}
                                                </StaticInfo>
                                                <StaticInfo>
                                                    {user.address ||
                                                        'Not provided'}
                                                </StaticInfo>
                                                <StaticInfo>
                                                    {user.city ||
                                                        'Not provided'}
                                                </StaticInfo>
                                                <StaticInfo>
                                                    {user.postcode ||
                                                        'Not provided'}
                                                </StaticInfo>
                                                <StaticInfo>
                                                    United Kingdom
                                                </StaticInfo>
                                                <StaticInfo>
                                                    {user.phone ||
                                                        'Not provided'}
                                                </StaticInfo>
                                            </Section>
                                            <Section>
                                                <SectionTitle>
                                                    Delivery Options
                                                </SectionTitle>
                                                <Option>
                                                    Standard Delivery - £5.00
                                                </Option>
                                                <Option>
                                                    Express Delivery - £10.00
                                                </Option>
                                            </Section>
                                            <Section>
                                                <SectionTitle>
                                                    Payment options
                                                </SectionTitle>
                                                <StaticInfo>
                                                    Payment Method Here:
                                                </StaticInfo>
                                            </Section>
                                        </>
                                    ) : (
                                        <LeftSection>
                                            {' '}
                                            <LoginSection />
                                            {/* <GuestCheckout /> */}
                                        </LeftSection>
                                    )}
                                </>
                            </LeftSection>

                            <RightSection>
                                <SummaryBox>
                                    <SummaryTitle>Your Order</SummaryTitle>
                                    {basket.map((item) => (
                                        <SummaryRow key={item.productId}>
                                            <span>
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span>
                                                £
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </SummaryRow>
                                    ))}

                                    <Divider />
                                    <SummaryRow>
                                        <span>Original Subtotal:</span>
                                        <span>£{calculateSubtotal()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Subtotal:</span>
                                        <span>
                                            £
                                            {(
                                                parseFloat(
                                                    calculateSubtotal(),
                                                ) - discountValue
                                            ).toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Delivery:</span>
                                        {/* <span>£5.00</span> */}
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>VAT:</span>
                                        <span>£{calculateVAT()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Discount:</span>
                                        <span>
                                            £{discountValue.toFixed(2)}
                                            {appliedCode &&
                                                discountValue <
                                                    appliedCode.value &&
                                                ` (of £${appliedCode.value.toFixed(2)})`}
                                        </span>
                                    </SummaryRow>
                                    <SummaryTotal>
                                        <span>Total to Pay:</span>
                                        <span>£{calculateTotal()}</span>
                                    </SummaryTotal>

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
                                                    setDiscountCode(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {discountApplied ? (
                                                <Button
                                                    label="Remove"
                                                    size="small"
                                                    variant="secondary"
                                                    onClick={
                                                        handleRemoveDiscount
                                                    }
                                                />
                                            ) : (
                                                <Button
                                                    label="Apply"
                                                    size="small"
                                                    variant="primary"
                                                    onClick={
                                                        handleApplyDiscount
                                                    }
                                                />
                                            )}
                                        </InputRow>
                                        {discountError && (
                                            <ErrorText>
                                                {discountError}
                                            </ErrorText>
                                        )}
                                    </DiscountWrapper>

                                    <ButtonWrapper>
                                        {isAuthenticated ? (
                                            <Button
                                                onClick={() =>
                                                    console.log(
                                                        'Checkout confirmed',
                                                    )
                                                }
                                                variant="primary"
                                                size="small"
                                                label="Confirm Order"
                                            />
                                        ) : (
                                            <PromptText>
                                                You must log in to complete
                                                checkout.
                                            </PromptText>
                                        )}
                                    </ButtonWrapper>
                                </SummaryBox>
                            </RightSection>
                        </CheckoutGrid>
                    </CheckoutCard>
                </CenteredContainer>
            </StyledMainContainer>
            <Footer />
        </>
    );
};

const PromptText = styled.div`
    color: #c79d0a;
    font-family: Cinzel, sans-serif;
    font-size: 14px;
    font-weight: bold;
    margin-top: 0.5rem;
`;

const ErrorText = styled.span`
    color: red;
    font-size: 1rem;
    font-weight: bold;
    font-family: Cinzel, serif;
    margin-top: 0.5rem;
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

const StyledMainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenteredContainer = styled.div`
    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: center;
        color: white;
    }
    width: 100%;
    max-width: 1200px;
    padding: 2rem 1rem;
`;

const CheckoutCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #1b133d;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    border: 2px solid #4d3c7b;
    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        line-height: 35.05px;
        color: #c79d0a;
        padding: 1rem 1rem 1rem 0rem;
    }
`;

const StyledLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    margin-bottom: 2rem;
    color: white;
    font-size: 18px;
    font-family: Cinzel;
    letter-spacing: 0.1em;
    font-weight: 400;
    text-decoration: none;

    svg {
        margin-right: 8px;
        color: #c79d0a;
        transform: rotate(90deg);
        width: 20px;
        height: 20px;
    }

    &:hover {
        color: #c79d0a;
    }
`;

const CheckoutGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const RightSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    background: #221745;
    padding: 1rem;
    border-radius: 8px;
    color: white;
    border-bottom: 1px solid #2c2271;
    margin-bottom: 20px;
    border: 2px solid #4d3c7b;
`;

const SectionTitle = styled.h2`
    font-family: Cinzel;
    font-size: 20px;
    margin-bottom: 10px;
    color: #c79d0a;
`;

const StaticInfo = styled.div`
    font-size: 16px;
    margin-bottom: 6px;
`;

const Option = styled.div`
    font-size: 16px;
    margin-bottom: 8px;
`;

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
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 5rem;
    margin-top: 20px;
    span:first-child {
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        color: #c79d0a;
        font-family: Cinzel, sans-serif;
    }

    span:last-child {
        color: #ffffff;
        font-size: 1.2rem;
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
        font-size: 1.2rem;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
