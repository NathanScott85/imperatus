import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { ProductItem } from './product-item';
import { OrderSummary } from './summary';
import { FancyContainer } from '../../components/fancy-container';
import { useBasketContext } from '../../context/basket';

export const Basket = () => {
    const { basket } = useBasketContext();

    const calculateTotal = (): string => {
        const total = basket.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );
        return total.toFixed(2);
    };

    const calculatePriceWithoutVAT = (): string => {
        const subtotal = parseFloat(calculateSubtotal());
        return (subtotal / 1.2).toFixed(2);
    };

    const calculateVAT = (): string => {
        const subtotal = parseFloat(calculateSubtotal());
        return (subtotal - subtotal / 1.2).toFixed(2);
    };

    const calculateSubtotal = (): string => {
        return basket
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Basket" />
            <BasketContainer>
                <CenteredContainer>
                    <BasketSection>
                        <BasketHeader>
                            <h1>Basket</h1>
                            <p>
                                Current Basket Total:{' '}
                                {basket.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0,
                                )}
                            </p>
                        </BasketHeader>

                        <BasketContent>
                            {basket.length === 0 ? (
                                <FancyContainer size="login" variant="login">
                                    <FancyContainerSubWrapper>
                                        <p>
                                            Your basket is empty. Please add
                                            some products to your basket.
                                        </p>
                                    </FancyContainerSubWrapper>
                                </FancyContainer>
                            ) : (
                                <ProductList>
                                    {basket.map((product) => (
                                        <ProductItem
                                            key={product.productId}
                                            product={product}
                                        />
                                    ))}
                                </ProductList>
                            )}
                            <OrderSummaryContent>
                                <OrderSummary
                                    basketProductsLength={basket.reduce(
                                        (sum, item) => sum + item.quantity,
                                        0,
                                    )}
                                    calculateSubtotal={calculateSubtotal}
                                    calculatePriceWithoutVAT={
                                        calculatePriceWithoutVAT
                                    }
                                    calculateTotal={calculateTotal}
                                    calculateVat={calculateVAT}
                                />
                            </OrderSummaryContent>
                        </BasketContent>
                    </BasketSection>
                </CenteredContainer>
            </BasketContainer>
            <Footer />
        </>
    );
};

export const BasketContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: black;
    background-color: #130a30;
`;

const BasketHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;
    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: center;
        color: #c79d0a;
        padding: 1rem 1rem 1rem 0rem;
    }
    p {
        font-family: Cinzel;
        font-size: 18px;
        font-weight: 500;
        line-height: 29.66px;
        text-align: center;
        color: #c79d0a;
        padding: 1rem 1rem 1rem 0rem;
    }
`;

export const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
`;

export const BasketSection = styled.section`
    width: 100%;
    margin: 2rem;
    background-color: #1b133d;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 2px solid #4d3c7b;
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;

    p {
        margin: 0.5rem;
        font-family: 'Cinzel', sans-serif;
        font-size: 16px;
    }

    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    z-index: 50;
`;

export const WishlistSection = styled.section`
    width: 100%;
    margin: 20px 0;
    padding: 10px;
    border-radius: 8px;
`;

export const BasketContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-start;
`;

const OrderSummaryContent = styled.div`
    margin-left: 3rem;
`;

export const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 3;
`;
