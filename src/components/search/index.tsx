import React, { ChangeEvent } from 'react';
import { SearchIcon } from '../svg';
import { styled } from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';
import { Input } from '../input';

export const Search = () => {
    const [search, setSearch] = React.useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        console.log('Search submitted:', search);
        setSearch(''); // Clear the search input
    };

    return (
        <SearchContainer>
            <Input
                value={search}
                name="search"
                variant="search"
                className="search-input"
                type="text"
                onChange={onChange}
                placeholder={search ? '' : 'Search'}
            />
            <SearchButton className="search-button" onClick={onSubmit}>
                <SearchIcon />
            </SearchButton>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    color: #c79d0a;
    margin: 0 3.5rem;
    padding: 1.2rem 0.75rem;
    ${mediaQueries('md')`
        width: 100%;
    `};
    ${mediaQueries('xl')`
        padding-left: 0rem;
        width: 600px;
    `};

    &:focus-within {
        .search-button {
            border: 1px solid #c79d0a;
            outline: none;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top-left-radius: 0px;
        }
        .search-input {
            border: 1px solid #c79d0a;
            border-top-right-radius: 0px;
            border-right: none;
        }
    }
`;

export const SearchButton = styled.button`
    border: 1px solid #ac8fff80;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: transparent;
    color: #fff;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    line-height: 1.5rem;
    height: 36px;
    padding: 1rem 1.25rem 1.15rem 0.25rem;
    margin: -0.5rem;
    ${mediaQueries('sm')`
        border: 1px solid #ac8fff80;
    `};
    ${mediaQueries('md')`
         padding: 1rem;
    `};
`;
