import React from 'react';
import styled from 'styled-components';

export const Discount = () => (
    <DiscountContainer>
        <DiscountTitle>Discount</DiscountTitle>
    </DiscountContainer>
);

const DiscountContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const DiscountTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;
