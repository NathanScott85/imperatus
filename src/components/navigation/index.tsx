import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { mediaQueries } from '../../styled/breakpoints';

const navItems = [
    {
        id: 1,
        name: 'Categories',
        path: '/shop/categories',
        divider: false,
        displayed: true,
    },
    {
        id: 2,
        name: 'Card Games',
        path: '/shop/card-games',
        divider: false,
        displayed: true,
    },
    {
        id: 3,
        name: 'Accessories',
        path: '/shop/accessories',
        divider: false,
        displayed: true,
    },
    {
        id: 4,
        name: 'Boardgames',
        path: '/shop/board-games',
        divider: false,
        displayed: true,
    },
    {
        id: 5,
        name: 'Coming Soon',
        path: '/shop/coming-soon',
        divider: false,
        displayed: true,
    },
    {
        id: 6,
        name: 'Offers',
        path: '/shop/offers',
        divider: false,
        displayed: true,
    },
];

interface NavigationProps {
    background?: boolean;
}

export const Navigation = ({ background }: NavigationProps) => (
    <NavigationContainer background={background}>
        <NavigationList>
            {navItems.map((item, index) => (
                <React.Fragment key={item.name + index + item.id}>
                    {item.displayed && (
                        <NavigationItem to={item.path} end>
                            {item.name}
                        </NavigationItem>
                    )}
                    {item.divider && <Divider />}
                </React.Fragment>
            ))}
        </NavigationList>
    </NavigationContainer>
);

export const NavigationContainer = styled.nav<NavigationProps>`
    ${({ background }) => `
        background-color: ${background ? '#130A30' : 'transparent'};
    `}
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #ffffff;
    height: 62px;
    width: 100%;
    padding: 0 1.75rem;
    border-bottom: 1px solid #4d3c7b;
`;

export const NavigationList = styled('ul')`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    width: 100%;
    padding: 0 1.75rem;
    ${mediaQueries('md')`
        padding: 1rem;
    `};
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0 1.75rem;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    color: white;
    text-decoration: none;
    height: 100%;
    &:hover {
        color: #d4b05f;
        font-weight: 700;
    }
    &.active {
        border-bottom: 2px solid #d4b05f;
    }
    ${mediaQueries('md')`
        padding: 1.75rem;
    `};
`;

export const Divider = styled('div')`
    height: 2.5rem;
    width: 1px;
    background-color: #d4b05f;
`;
