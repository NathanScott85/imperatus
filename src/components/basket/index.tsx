import React from 'react';
import { styled } from 'styled-components';
import { BasketIcon } from '../svg';
import { Link } from 'react-router-dom';

const items = [
    {
        id: 1,
        name: 'Card 1',
        price: 1.99,
        quantity: 1,
    },
    {
        id: 2,
        name: 'Card 2',
        price: 2.99,
        quantity: 1,
    },
    {
        id: 3,
        name: 'Card 3',
        price: 3.99,
        quantity: 1,
    },
];

export const Basket = () => (
    <Link to="/basket">
        <BasketContainer>
            {items.length > 0 ? (
                <BasketIcon type={'full'} />
            ) : (
                <BasketIcon type={'Bag'} />
            )}
            <BasketWrapper>Basket</BasketWrapper>
            <Divider />
            <BasketItems>
                <BasketWrapper>{items.length}</BasketWrapper>
            </BasketItems>
        </BasketContainer>
    </Link>
);
const BasketWrapper = styled('span')`
    padding: 0.25rem 0.25rem;
`;

const BasketItems = styled('span')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10rem !important;
    font-weight: 500;
`;

export const BasketContainer = styled('span')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0.25rem 0.75rem 0.25rem;
    color: #fff;
    font-family: Barlow;
`;

export const Divider = styled('div')`
    height: 1rem;
    width: 1px;
    margin: 0 0.5rem;
    background-color: #ffffff;
`;
