import React from 'react';
import { SearchIcon } from '../svg';
import { styled } from '@mui/material';

export const Search = () => { 
    const [search, setSearch] = React.useState('');

    const onChange = (e: any) => {
        setSearch(e.target.value);
    };

    return(
        <SearchContainer>
            {/* <UsingTheme>Using Theme</UsingTheme> See comments below */}
            <Input type="text" onChange={onChange} placeholder={search ? '' : "Search"} />
            <SearchButton>
                <SearchIcon />
            </SearchButton>
        </SearchContainer>
    );
}

const SearchContainer = styled('div')`  
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #D4B05F;
    margin: 0 3.5rem;
    padding: 1.2rem 0.75rem 1.2rem 0.75rem;
    @media (max-width: 667px) {
        margin: 0;
        padding: 0.5rem;
        width: 100%;
    }
    
    @media (min-width: 915px) {
         width: 618px;
    }
`;

export const Input = styled('input')`
    border: 1px solid rgba(172, 143, 255, 0.50);
    border-right: none;
    background: transparent;
    color: white;
    font-family: Barlow;
    font-size: 1rem; 
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    flex: 1;
    height: 35px;
    text-align: left;
    caret-color: white;
    padding: 0.75rem 0.75rem 0.75rem 0;
    margin: 0 0.5rem;
    ::placeholder {
        color: #D3D3D3 !important;
        margin-left: 0.1rem;
        font-size: 1rem;
        color: #FFF;
        font-family: Barlow;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    text-indent: 20px;
    &:focus::placeholder {
        color: transparent;
    }
    &:active::placeholder {
        color: transparent;
    }
    &:focus {
        outline: none;
    }
  
    @media (max-width: 768px) {
        margin: 0;
        width: 100%;
    }
    @media (min-width: 915px) {
        width: 618px;
    }
`;

export const SearchButton = styled('button')`
    border: 1px solid #AC8FFF80;
    border-left: none;
    background: transparent;
    color: #FFF;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    line-height: 1.5rem;
    height: 35px;
    padding: 1rem 1.25rem 1.15rem 0.25rem;
    margin: -0.5rem;
    &:focus {
        outline: none;
    }
    @media (max-width: 768px) {
        margin: 0;
    }
`;
