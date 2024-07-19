import React from 'react';
import styled from 'styled-components';
import { StockStatus } from './stock-status';

type Status = 'inStock' | 'outOfStock';

interface FiltersProps {
    handleChecked: (status: Status) => void;
    checkedStatus: {
        inStock: boolean;
        outOfStock: boolean;
    };
    filters?: boolean;
}
export const Filters: React.FC<FiltersProps> = ({
    handleChecked,
    checkedStatus,
    filters,
}) => {
    return (
        <>
            {filters && (
                <FiltersContainer>
                    <h1>Filters</h1>
                    <StockStatus
                        handleChecked={handleChecked}
                        checkedStatus={checkedStatus}
                    />
                    <FilterList>
                        <FilterItem>BRAND</FilterItem>
                        <FilterItem>POKEMON SET</FilterItem>
                        <FilterItem>SINGLE CARDS</FilterItem>
                        <FilterItem>RARITY</FilterItem>
                        <FilterItem>PRODUCTS</FilterItem>
                        <FilterItem>ENERGY / TRAINER TYPE</FilterItem>
                    </FilterList>
                </FiltersContainer>
            )}
        </>
    );
};

const FiltersContainer = styled.div`
    color: black;
    text-align: left;
    margin: 2rem;

    display: flex;
    flex-direction: column;

    h1 {
        font-family: Cinzel, serif;
        font-size: 30px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding-bottom: 1rem;
        color: black;
        text-align: left;
        margin: 0;
    }
`;

const FilterList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FilterItem = styled.li`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    text-align: left;
    padding: 0.5rem 0rem 1rem 0rem;
    border-bottom: 1px solid #e5def9;
`;
