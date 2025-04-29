import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from '../../components/svg/arrow';

export const Checkout = () => {
    const shippingDetails = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '0123456789',
        address: '123 Main Street',
        city: 'London',
        postalCode: 'W1A 1AA',
        country: 'United Kingdom',
    };

    const calculateSubtotal = () => '100.00';
    const calculateDelivery = () => '5.00';
    const calculateVAT = () =>
        (
            (parseFloat(calculateSubtotal()) +
                parseFloat(calculateDelivery())) *
            0.2
        ).toFixed(2);
    const calculateTotal = () =>
        (
            parseFloat(calculateSubtotal()) +
            parseFloat(calculateDelivery()) +
            parseFloat(calculateVAT())
        ).toFixed(2);

    const handleCheckout = () => {
        console.log('Checkout confirmed');
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
                        <CheckoutGrid>
                            <LeftSection>
                                <Section>
                                    <SectionTitle>Email Address</SectionTitle>
                                    <StaticInfo>
                                        {shippingDetails.email}
                                    </StaticInfo>
                                </Section>
                                <Section>
                                    <SectionTitle>
                                        Delivery Address
                                    </SectionTitle>
                                    <StaticInfo>
                                        {shippingDetails.fullName}
                                    </StaticInfo>
                                    <StaticInfo>
                                        {shippingDetails.address}
                                    </StaticInfo>
                                    <StaticInfo>
                                        {shippingDetails.city}
                                    </StaticInfo>
                                    <StaticInfo>
                                        {shippingDetails.postalCode}
                                    </StaticInfo>
                                    <StaticInfo>
                                        {shippingDetails.country}
                                    </StaticInfo>
                                </Section>

                                <Section>
                                    <SectionTitle>
                                        Delivery Options
                                    </SectionTitle>
                                    <Option>Standard Delivery - £5.00</Option>
                                    <Option>Express Delivery - £10.00</Option>
                                </Section>

                                <Section>
                                    <SectionTitle>Payment options</SectionTitle>
                                    <StaticInfo>
                                        Payment Method Here:
                                    </StaticInfo>
                                </Section>
                            </LeftSection>

                            <RightSection>
                                <SummaryBox>
                                    <SummaryTitle>Your Order</SummaryTitle>
                                    <SummaryRow>
                                        <span>Subtotal:</span>
                                        <span>£{calculateSubtotal()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Delivery:</span>
                                        <span>£{calculateDelivery()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>VAT:</span>
                                        <span>£{calculateVAT()}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Postage:</span>
                                        <span>£5</span>
                                    </SummaryRow>
                                    <SummaryTotal>
                                        <span>Total to Pay:</span>
                                        <span>£{calculateTotal()}</span>
                                    </SummaryTotal>
                                </SummaryBox>

                                <ButtonWrapper>
                                    <Button
                                        onClick={handleCheckout}
                                        variant="primary"
                                        size="medium"
                                        label="Confirm Order"
                                    />
                                </ButtonWrapper>
                            </RightSection>
                        </CheckoutGrid>
                    </CheckoutCard>
                </CenteredContainer>
            </StyledMainContainer>
            <Footer />
        </>
    );
};

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
    background: #221745;
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
    }

    span:last-child {
        color: #ffffff;
        font-size: 1.2rem;
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
