import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Button from '../../components/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowDown } from '../../components/svg/arrow';
import { useAppContext } from '../../context';
import { useBasketContext } from '../../context/basket';
import { useCheckoutContext } from '../../context/checkout';
import { LoginSection } from './login-section';

export const Checkout = () => {
    const { user, isAuthenticated } = useAppContext();
    const { basket, clearBasket, discountCode, discountValue } =
        useBasketContext();
    const navigate = useNavigate();
    const { createOrder, isFirstOrder, fetchIsFirstOrder } =
        useCheckoutContext();

    const calculateSubtotal = (): string => {
        return basket
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const calculateDiscount = (): number => {
        return isFirstOrder
            ? 0.05 * parseFloat(calculateSubtotal())
            : discountValue;
    };

    const calculatePriceWithoutVAT = (): string => {
        const subtotal = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return (subtotal / 1.2).toFixed(2);
    };

    const calculateVAT = (): string => {
        const discounted = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return (discounted - discounted / 1.2).toFixed(2);
    };

    const calculateTotal = (): string => {
        const discounted = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return discounted.toFixed(2);
    };

    const handleCheckout = async () => {
        if (!user) return;
        const response = await createOrder({
            email: user.email,
            name: user.fullname || '',
            address: user.address || '',
            city: user.city || '',
            postcode: user.postcode || '',
            phone: user.phone || '',
            shippingCost: 0,
            items: basket.map((item) => ({
                productId: Number(item.productId),
                quantity: item.quantity,
                price: item.price,
            })),
            discountCode: isFirstOrder ? undefined : discountCode,
        });
        // console.log(response, 'response');
        if (response.success) {
            clearBasket();
            if (response.order?.firstOrder) {
                await fetchIsFirstOrder(user.email);
            }
            if (response.order) {
                navigate(`/order/confirmation/${response.order.id}`);
            }
        } else {
            console.error('Checkout failed:', response.message);
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Checkout" />

            {isFirstOrder && (
                <Banner>
                    🎉 5% off applied automatically for your first order!
                </Banner>
            )}

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
                                                {user.address || 'Not provided'}
                                            </StaticInfo>
                                            <StaticInfo>
                                                {user.city || 'Not provided'}
                                            </StaticInfo>
                                            <StaticInfo>
                                                {user.postcode ||
                                                    'Not provided'}
                                            </StaticInfo>
                                            <StaticInfo>
                                                United Kingdom
                                            </StaticInfo>
                                            <StaticInfo>
                                                {user.phone || 'Not provided'}
                                            </StaticInfo>
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
                                        <LoginSection />
                                    </LeftSection>
                                )}
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
                                        <span>Discount:</span>
                                        <span>
                                            £{calculateDiscount().toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Subtotal (Discounted):</span>
                                        <span>
                                            £
                                            {(
                                                parseFloat(
                                                    calculateSubtotal(),
                                                ) - calculateDiscount()
                                            ).toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>VAT:</span>
                                        <span>£{calculateVAT()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Price without VAT:</span>
                                        <span>
                                            £{calculatePriceWithoutVAT()}
                                        </span>
                                    </SummaryRow>
                                    <SummaryTotal>
                                        <span>Total to Pay:</span>
                                        <span>£{calculateTotal()}</span>
                                    </SummaryTotal>

                                    <ButtonWrapper>
                                        {isAuthenticated ? (
                                            <Button
                                                onClick={handleCheckout}
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

const Banner = styled.div`
    background: #4d3c7b;
    color: #c79d0a;
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
    font-family: Cinzel, sans-serif;
    font-weight: bold;
`;

const StyledMainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenteredContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 2rem 1rem;

    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        text-align: center;
        color: #c79d0a;
        margin-bottom: 0.2rem;
    }
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
`;

const StyledLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    margin-bottom: 2rem;
    color: white;
    font-size: 18px;
    font-family: Cinzel;
    letter-spacing: 0.1em;
    text-decoration: none;

    svg {
        margin-right: 8px;
        color: #c79d0a;
        transform: rotate(90deg);
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
