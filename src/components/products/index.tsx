import React from "react";
import styled from "styled-components";
import { Product } from "../product";
import { mediaQueries } from "../../styled/breakpoints";

type Product = {
    id: any
    img: string;
    name: string;
    price: string;
    rrp: string;
    category: string;
    game: string,
}

interface ProductsProps {
    products: Product[];
    label: string;
}
export const Products = ({ products, label }: ProductsProps) => {
    return (
        <Section>
            <ProductsWrapper>
            <ProductsHeader>{label}</ProductsHeader>
            <ProductsContainer>
                    {products?.length !== 0 ? (
                        products.map((product: Product) => (
                            <Product key={product.img} product={product} />
                        ))
                    ) : (
                        <NoProductsMessage>No products available, please check back later</NoProductsMessage>
                    )}
                </ProductsContainer>
            </ProductsWrapper>
        </Section>
    );
};

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
    color: #130A30;

    ${mediaQueries("md")`
        padding-left: 3rem;
        width: 100%;
    `};
    ${mediaQueries("xl")`
        padding-left: 0rem;
        width: 100%;
    `};
`;

const ProductsWrapper = styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 2rem 0;
    ${mediaQueries("sm")`
        height: 25vh;
    `};  
      ${mediaQueries("md")`
        height: 100%;
    `};
`;

const NoProductsMessage = styled.div`
    font-size: 18px;
    color: #777;
    text-align: center;
    margin-top: 20px;
    width: 100%;
`;