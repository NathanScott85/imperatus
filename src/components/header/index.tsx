import React from 'react';
import { styled } from 'styled-components';
import { Search } from '../search';
import { Login } from '../login';
import { ImperatusLink } from '../imperatus-link';
import { Basket } from '../basket';
import { AdminIcon } from '../svg';
import { Link } from 'react-router-dom';
import { mediaQueries } from '../../styled/breakpoints';
import { useAppContext } from '../../context';

interface HeaderProps {
    background?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ background }: HeaderProps) => {
    const { isAdminOrOwner } = useAppContext();
    //TODO:  add values to search so that it does not error.
    return (
        <HeaderContainer background={background}>
            <ImperatusLink />
            <Search
                search=""
                handleReset={() => ''}
                onChange={() => ''}
                onSearch={() => ''}
                type="text"
            />
            <HeaderWrapper>
                <Login />
                <Basket />
            </HeaderWrapper>

            {isAdminOrOwner && (
                <Link to={`/account/admin`}>
                    <AdminIcon />
                </Link>
            )}
        </HeaderContainer>
    );
};

export const TopHeader = () => (
    <ContactHeader> Mon - Fri 9:00am - 5:00pm - 01234 567 890 </ContactHeader>
);

const HeaderContainer = styled.header<HeaderProps>`
    background-color: ${({ background }) => ` ${background ? '#130A30' : 'transparent'};`}
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #C79D0A;
    height: 62px;
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

const HeaderWrapper = styled('span')`
    display: flex;
`;

const ContactHeader = styled('header')`
    background-color: #05030f;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #c79d0a;
    height: 38px;
    width: 100%;
    padding-left: 0.75rem;
    line-height: 57px;
    padding: 0 1.75rem;
`;
