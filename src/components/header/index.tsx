import React from 'react';
import { styled } from 'styled-components';
import { Search } from '../search';
import { Login } from '../login';
import { ImperatusLink } from '../imperatus-link';
import { Basket } from '../basket';
import { AdminIcon } from '../svg';
import { Link } from 'react-router-dom';
import { mediaQueries } from '../../styled/breakpoints';

// TODO: bring users back from api;
import { usersArray } from '../../lib/users-mocks';

interface HeaderProps {
    background?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ background }: HeaderProps) => {
    return (
        <HeaderContainer background={background}>
            <ImperatusLink />
            <Search />
            <HeaderWrapper>
                <Login />
                <Basket />
            </HeaderWrapper>
            {usersArray.map((user: any) =>
                user.role.includes('admin') ? (
                    <Link key={user.id} to={`/account/admin`}>
                        <AdminIcon />
                    </Link>
                ) : null,
            )}
        </HeaderContainer>
    );
};

export const TopHeader = () => (
    <ContactHeader>01234 567 890 Mon - Fri 9:00am - 5:00pm</ContactHeader>
);

const HeaderContainer = styled.header<HeaderProps>`
    ${({ background }) => `
        background-color: ${background ? '#130A30' : 'transparent'};
    `}
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #d4b05f;
    height: 62px;
    width: 100%;
    padding: 0 1.75rem;
    border-bottom: 1px solid #4d3c7b;
    ${mediaQueries('md')`
        width: 100%;
    `};
    ${mediaQueries('xl')`
        padding-left: 0rem;
        width: 100%;
    `};
`;

const HeaderWrapper = styled('span')`
    display: flex;
`;

const ContactHeader = styled('header')`
    background-color: #05030f;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #d4b05f;
    height: 38px;
    width: 100%;
    padding: 0 1.75rem;
    ${mediaQueries('md')`
        width: 100%;
    `};
    ${mediaQueries('xl')`
        padding-left: 0rem;
        width: 100%;
    `};
`;
