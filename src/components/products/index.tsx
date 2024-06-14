import React from "react";
import styled from "styled-components";
import { Product } from "../product";

type Product = {
    img: string;
    name: string;
    price: string;
    rrp: string;
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
                {products.map((product: any) => {
                    return (<Product key={product.id} product={product} />)
                })}
            </ProductsContainer>
            </ProductsWrapper>
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    color: black;
    font-size: 1.5rem;
    @media (max-width: 768px) {
        padding: 1.5rem 0;
        font-size: 1.25rem;
    }

    @media (max-width: 480px) {
        padding: 1rem 0;
        font-size: 1rem;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
         border: 2px solid orange;
    }

    @media (max-width: 350px) {
        flex-direction: column;
        align-items: center;
        border: 2px solid red;
    }
`;

const ProductsHeader = styled.h1`
    font-family: Cinzel;
    font-size: 30px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #130A30;

`;

const ProductsWrapper = styled.div``;