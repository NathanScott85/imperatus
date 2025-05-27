import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { TopHeader, Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Button from '../../components/button';
import { useAppContext } from '../../context';
import { Login } from '../login';

const GET_ORDER_BY_ID = gql`
    query GetOrder($id: Int!) {
        getOrder(id: $id) {
            id
            orderNumber
            name
            email
            address
            city
            postcode
            phone
            subtotal
            vat
            shippingCost
            total
            discountCode {
                code
            }
            items {
                id
                quantity
                price
                product {
                    name
                    img {
                        url
                    }
                }
            }
        }
    }
`;

export const OrderConfirmation = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppContext();
    const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
        variables: { id: Number(orderId) },
        skip: !orderId || !isAuthenticated,
    });

    useEffect(() => {
        if (!loading && error?.message === 'Unauthorized') {
            navigate('/account/login');
        } else if (!loading && error) {
            navigate('/404');
        }
    }, [loading, error, navigate]);

    if (!isAuthenticated) {
        return <Login isAuthenticated={false} />;
    }

    if (loading) return null;
    if (error || !data?.getOrder) {
        return null;
    }
    const order = data.getOrder;
    const discountAmount = order.subtotal - order.total + order.shippingCost;
    const discountedSubtotal = order.total - order.shippingCost;
    const priceWithoutVAT = discountedSubtotal / 1.2;
    console.log('requesting user:', user ? user.id : 'unknown');

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Order Confirmation" />
            <StyledMainContainer>
                <CenteredContainer>
                    <CheckoutCard>
                        <OrderHeader>
                            <h1>Order Confirmation</h1>
                            <p>
                                Order Total:{' '}
                                {order.items.reduce(
                                    (sum: number, item: { quantity: number }) =>
                                        sum + item.quantity,
                                    0,
                                )}
                            </p>
                        </OrderHeader>
                        <CheckoutGrid>
                            <LeftSection>
                                <Section>
                                    <SectionTitle>Order Number</SectionTitle>
                                    <StaticInfo>{order.orderNumber}</StaticInfo>
                                </Section>

                                <Section>
                                    <SectionTitle>Customer</SectionTitle>
                                    <StaticInfo>{order.name}</StaticInfo>
                                    <StaticInfo>{order.email}</StaticInfo>
                                    <StaticInfo>{order.phone}</StaticInfo>
                                </Section>

                                <Section>
                                    <SectionTitle>
                                        Delivery Address
                                    </SectionTitle>
                                    <StaticInfo>{order.address}</StaticInfo>
                                    <StaticInfo>{order.city}</StaticInfo>
                                    <StaticInfo>{order.postcode}</StaticInfo>
                                    <StaticInfo>United Kingdom</StaticInfo>
                                </Section>
                            </LeftSection>

                            <RightSection>
                                <SummaryBox>
                                    <SummaryTitle>Your Items</SummaryTitle>
                                    {order.items.map(
                                        (item: {
                                            id: number;
                                            quantity: number;
                                            price: number;
                                            product: {
                                                name: string;
                                            };
                                        }) => (
                                            <SummaryRow key={item.id}>
                                                <span>
                                                    {item.product.name} x{' '}
                                                    {item.quantity}
                                                </span>
                                                <span>
                                                    £
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </SummaryRow>
                                        ),
                                    )}

                                    <Divider />
                                    <SummaryRow>
                                        <span>Original Subtotal:</span>
                                        <span>
                                            £{order.subtotal.toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    {discountAmount > 0 &&
                                        order.discountCode && (
                                            <SummaryRow>
                                                <span>
                                                    Discount (
                                                    {order.discountCode.code}
                                                    ):
                                                </span>
                                                <span>
                                                    -£
                                                    {discountAmount.toFixed(2)}
                                                </span>
                                            </SummaryRow>
                                        )}
                                    <SummaryRow>
                                        <span>Subtotal (Discounted):</span>
                                        <span>
                                            £{discountedSubtotal.toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>VAT:</span>
                                        <span>£{order.vat.toFixed(2)}</span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Price without VAT:</span>
                                        <span>
                                            £{priceWithoutVAT.toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <span>Shipping:</span>
                                        <span>
                                            £{order.shippingCost.toFixed(2)}
                                        </span>
                                    </SummaryRow>
                                    <SummaryTotal>
                                        <span>Total Paid:</span>
                                        <span>£{order.total.toFixed(2)}</span>
                                    </SummaryTotal>
                                </SummaryBox>
                            </RightSection>
                        </CheckoutGrid>

                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                label="Continue Shopping"
                                onClick={() => navigate('/shop/categories')}
                            />
                        </ButtonWrapper>
                    </CheckoutCard>
                </CenteredContainer>
            </StyledMainContainer>
            <Footer />
        </>
    );
};

const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: #1b133d;

    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        color: #c79d0a;
        margin: 0;
    }

    p {
        font-family: Cinzel;
        font-size: 20px;
        color: #c79d0a;
        margin-left: 0.75rem;
    }
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
    }

    span:last-child {
        color: #ffffff;
        font-family: Cinzel;
        font-size: 1.2rem;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;
