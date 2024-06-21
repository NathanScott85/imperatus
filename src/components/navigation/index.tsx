import React from "react";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { mediaQueries } from "../../styled/breakpoints";

const navItems = [
    {
        id: 1,
        name: "Categories",
        path: "/shop/categories",
        divider: false,
        displayed: true,
    },
    {
        id: 2,
        name: "Card Games",
        path: "/shop/card-games",
        divider: false,
        displayed: true,
    },
    {
        id: 3,
        name: "Accessories",
        path: "/shop/accessories",
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
        name: "Coming Soon",
        path: "/shop/coming-soon",
        divider: false,
        displayed: true,
    },
    {
        id: 6,
        name: "Offers",
        path: "/shop/offers",
        divider: false,
        displayed: true,
    },
];

export const Navigation = () => (
    <NavigationContainer>
        <NavigationList>
            {navItems.map((item, index) => (
                <React.Fragment key={item.name + index + item.id}>
                    {item.displayed && <NavigationItem to={item.path}>
                        {item.name}
                    </NavigationItem>}
                    {item.divider && <Divider />}
                </React.Fragment>
            ))}
        </NavigationList>
    </NavigationContainer>
);

export const NavigationContainer = styled('nav')`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #FFFFFF;
    height: 62px;
    width: 100%;
    padding: 0 1.75rem;
    border-bottom: 1px solid #4D3C7B;
`;

export const NavigationList = styled('ul')`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    width: 100%;
    padding: 0 1.75rem;
     ${mediaQueries("md")`
        padding: 1rem;
    `};
`;

export const NavigationItem = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    width: 100%;
    padding: 0 1.75rem;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    &:hover {
        color: #D4B05F;
        font-weight: 700;
    }
    height: 19px;
    ${mediaQueries("md")`
        padding: 1.75rem;
    `};
`;

export const Divider = styled('div')`
    height: 2.5rem;
    width: 1px;
    background-color: #D4B05F;
`;
