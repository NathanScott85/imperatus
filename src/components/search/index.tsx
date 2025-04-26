import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SearchIcon } from '../svg';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';
import { Input } from '../input';

interface SearchProps {
    search: string;
    onSearch: (searchTerm: string) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    variant?: 'small' | 'large';
    handleReset: () => void;
    placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({
    search,
    onSearch,
    onChange,
    variant = 'large',
    handleReset,
    type,
    placeholder = 'Search',
}) => {
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchClick = () => {
        if (search) {
            onSearch(search);
            setIsSearching(true);
        }
    };

    const buttonReset = () => {
        onSearch('');
        handleReset();
        setIsSearching(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search) {
            handleSearchClick();
        }
    };

    return (
        <>
            {variant === 'large' && (
                <SearchContainer variant={variant}>
                    <Input
                        value={search}
                        name="search"
                        variant="search"
                        className="search-input"
                        type={type}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                    />
                    <SearchButton
                        type="button"
                        onClick={isSearching ? buttonReset : handleSearchClick}
                        className="search-button"
                    >
                        {isSearching ? <span>X</span> : <SearchIcon />}
                    </SearchButton>
                </SearchContainer>
            )}
            {variant === 'small' && (
                <SearchContainer variant={variant}>
                    <Input
                        variant="secondary"
                        size="small"
                        className="search-input"
                        placeholder={placeholder}
                        value={search}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                    />
                    {search && (
                        <ClearButton onClick={buttonReset}>✕</ClearButton>
                    )}
                </SearchContainer>
            )}
        </>
    );
};

const SearchContainer = styled.div<{ variant?: 'small' | 'large' }>`
    display: flex;
    align-items: center;
    color: #c79d0a;
    margin: 0 2.5rem;
    position: relative;

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
        }
    }

    ${({ variant }) =>
        variant === 'small' &&
        css`
            max-width: 325px;
            width: 100%;
            margin: 0;
        `}
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

const ClearButton = styled.button`
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    z-index: 999;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #c79d0a;
    }
`;
