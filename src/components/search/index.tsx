import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SearchIcon } from '../svg'; // Assuming you have a SearchIcon component
import styled from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';
import { Input } from '../input';

interface SearchProps {
    search: string;
    onSearch: (searchTerm: string) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    handleReset: any;
}

export const Search: React.FC<SearchProps> = ({
    search,
    onSearch,
    onChange,
    handleReset,
}) => {
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchClick = () => {
        if (search) {
            onSearch(search);
            setIsSearching(true);
        }
    };

    const buttonReset = () => {
        onSearch(''); // Clear the search
        handleReset();
        setIsSearching(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search) {
            handleSearchClick();
        }
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
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />
            <SearchButton
                type="button"
                onClick={isSearching ? buttonReset : handleSearchClick}
                className="search-button"
            >
                {isSearching ? <span>X</span> : <SearchIcon />}
            </SearchButton>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    color: #c79d0a;
    margin: 0 3.5rem;
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
    span {
        padding: 0.25rem;
        font-size: 15px;
    }
`;
