import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Search } from '../search';
import { Login } from '../login';
import { ImperatusLink } from '../imperatus-link';
import { Basket } from '../basket';
import { AdminIcon } from '../svg';
import { Link } from 'react-router-dom';
import { mediaQueries } from '../../styled/breakpoints';
import { useAppContext } from '../../context';
import { useProductsContext } from '../../context/products';

interface HeaderProps {
    background?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ background }: HeaderProps) => {
    const { isAdminOrOwner } = useAppContext();
    const { search, setSearch } = useProductsContext();
    const navigate = useNavigate();

    const triggerSearch = () => {
        if (search.trim()) {
            navigate(`/shop/search/${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <HeaderContainer background={background}>
            <ImperatusLink />
            <Search
                search={search}
                variant="large"
                handleReset={() => setSearch('')}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={triggerSearch}
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
    <ContactHeader data-testid="top-header">
        Mon - Fri 9:00am - 5:00pm - 01234 567 890{' '}
    </ContactHeader>
);

const HeaderContainer = styled.header<HeaderProps>`
    background-color: ${({ background }) =>
        background ? '#130A30' : 'transparent'};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 62px;
    width: 100%;
    color: #c79d0a;
    box-sizing: border-box;

    ${mediaQueries('sm')`
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    `};

    ${mediaQueries('lg')`
        flex-direction: row;
    `};
`;

const HeaderWrapper = styled.span`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ContactHeader = styled.header`
    background-color: #05030f;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: #c79d0a;
    width: 100%;
    padding: 0.75rem 1.75rem;
    font-size: 0.9rem;

    ${mediaQueries('md')`
       justify-content: center;
    `};

    ${mediaQueries('xl')`
             justify-content: flex-start;
        font-size: 1rem;
        height: 44px;
    `};
`;
