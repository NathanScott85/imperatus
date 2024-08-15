import React from 'react';
import styled from 'styled-components';
import {
    AdminDivider,
    AdminIcon,
    Cart,
    Pie,
    SquareShapes,
    UserIcon,
    Van,
    SignOut,
    Percent,
} from '../../../components/svg';

import { HomeIcon } from '../../../components/svg/home';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context';

export const Sidebar = ({ setSelectedComponent }: any) => {
    const { logout } = useAppContext();
    return (
        <SidebarAside>
            <Menu>
                <MenuItem onClick={() => setSelectedComponent('Overview')}>
                    <HomeIcon />
                    OVERVIEW
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Analytics')}>
                    <Pie />
                    ANALYTICS
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Orders')}>
                    <Cart />
                    ORDERS
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Discount')}>
                    <Percent />
                    DISCOUNT
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Products')}>
                    <SquareShapes />
                    PRODUCTS
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Shipping')}>
                    <Van />
                    SHIPPING
                </MenuItem>
                <MenuItem onClick={() => setSelectedComponent('Customers')}>
                    <UserIcon />
                    CUSTOMERS
                </MenuItem>
            </Menu>
            <BottomContainer>
                <AdminDivider />
                <BottomMenu>
                    <MenuItem onClick={() => setSelectedComponent('Settings')}>
                        <AdminIcon />
                        SETTINGS
                    </MenuItem>
                    <StyledLink onClick={logout} to="/account/sign-out">
                        <SignOut />
                        LOGOUT
                    </StyledLink>
                </BottomMenu>
            </BottomContainer>
        </SidebarAside>
    );
};

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
    margin: 0;
    padding-bottom: 0.75rem;
    cursor: pointer;
    font-family: Barlow;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.1em;

    svg {
        margin-right: 0.5rem;
    }

    &:hover {
        color: #c79d0a;
    }
`;

const SidebarAside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    width: 250px;
    height: 600px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    flex-grow: 1;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const BottomMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-top: 1rem;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
    margin: 0;
    padding-bottom: 0.75rem;
    cursor: pointer;
    font-family: Barlow;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.1em;

    svg {
        margin-right: 0.5rem;
    }

    &:hover {
        color: #c79d0a;
    }
`;
