import React from 'react';
import styled from 'styled-components';
import { Product } from '../product';
import { mediaQueries } from '../../styled/breakpoints';
import { FancyContainer } from '../fancy-container';
import { ProductType } from '../../types';

interface ProductsProps {
    products: ProductType[];
    label?: string;
}
export const Products = ({ products, label }: ProductsProps) => {
    console.log(products, 'products');
    return (
        <>
            {(label === 'Latest Products' ||
                label === 'Product Recommendations') && (
                <Section>
                    <ProductsWrapper>
                        <ProductsHeader>{label}</ProductsHeader>
                        <ProductsContainer>
                            {products?.length !== 0 ? (
                                products.map((product: ProductType) => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <NoProductsMessage>
                                    <FancyContainer variant="medium">
                                        No products available, please check back
                                        later
                                    </FancyContainer>
                                </NoProductsMessage>
                            )}
                        </ProductsContainer>
                    </ProductsWrapper>
                </Section>
            )}
            {label === undefined && (
                <ProductsSection>
                    {products.length !== 0 ? (
                        <ProductsGrid>
                            {products.map((product: ProductType) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </ProductsGrid>
                    ) : (
                        <NoProductsMessage>
                            <FancyContainer variant="filters" size="medium">
                                <p>
                                    No products available, please check back
                                    later
                                </p>
                            </FancyContainer>
                        </NoProductsMessage>
                    )}
                </ProductsSection>
            )}
        </>
    );
};

const ProductsSection = styled.div`
    flex: 1;
    & > div {
        padding: 0rem;
    }
`;

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    & > div {
        flex: 0 0 200px;
        max-width: 215px;
    }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 1.5rem;
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductsHeader = styled.h1`
    font-family: Cinzel;
    font-size: 30px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #130a30;

    ${mediaQueries('md')`
        padding-left: 3rem;
        width: 100%;
    `};
    ${mediaQueries('xl')`
        padding-left: 0rem;
        width: 100%;
    `};
`;

const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem 0;
    ${mediaQueries('sm')`
        height: 25vh;
    `};
    ${mediaQueries('md')`
        height: 100%;
    `};
`;

const NoProductsMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;

    width: 100%;
    p {
        color: black;
        height: 100%;
        color: black;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        z-index: 50;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding-bottom: 1rem;
    }
`;
