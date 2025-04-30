import React from 'react';
import styled from 'styled-components';
import { products as initialProducts } from '../../../lib/product-mocks';
import { ProductItem } from '../../basket/product-item';
import { FancyContainer } from '../../../components/fancy-container';
import Button from '../../../components/button';

export const Wishlist = () => {
    return (
        <WishlistSection>
            <h3>Wishlist</h3>
            <ProductList>
                {initialProducts.length > 0 ? (
                    initialProducts.map((product) => (
                        <ProductItem
                            variant
                            key={product.id}
                            product={product}
                            onRemove={() => console.log('here')}
                            onMove={() => console.log('here')}
                        />
                    ))
                ) : (
                    <FancyContainer variant="login" size="login">
                        <StyledFancyWrapper>
                            <EmptyResultsWrapper>
                                No products added to your Wishlist
                            </EmptyResultsWrapper>
                            <Button
                                label="Check out our categories"
                                variant="text"
                                pathname="/shop/categories"
                            />
                        </StyledFancyWrapper>
                    </FancyContainer>
                )}
            </ProductList>
        </WishlistSection>
    );
};

const StyledFancyWrapper = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    color: white;
    z-index: 50;
    text-align: center;
`;

const WishlistSection = styled.div`
    padding: 0rem 2rem 2rem 2rem;
    h1 {
        color: white;
        letter-spacing: 0.02em;
        font-family: Cinzel;
        font-size: 34px;
        font-weight: 400;
        line-height: 50px;
        text-align: left;
    }

    h3 {
        padding-bottom: 1rem;
        font-family: Cinzel;
        font-size: 20px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
`;
const EmptyResultsWrapper = styled.p`
    color: white;
    font-family: Barlow;
    font-size: 1.2rem;
    font-family: Barlow, sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 16.8px;
    margin-bottom: 0.5rem;
`;

export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: black;
    background-color: #130a30;
`;

export const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
`;

export const EmptyMessage = styled.p`
    color: white;
    text-align: center;
    font-size: 18px;
`;

export const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    width: 375px;
`;
