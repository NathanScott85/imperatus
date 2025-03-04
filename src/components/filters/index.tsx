import React from 'react';
import styled from 'styled-components';
import { StockStatus } from './stock-status';
import Button from '../button';
import { BrandFilter } from './brand-filter';
import { PriceSlider } from './price-filter';
import { SetFilter } from './set-filters';

interface FiltersType {
    brandId?: number[];
    setId?: number[];
    preorder?: boolean;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
    stockMax?: number;
}

interface FiltersProps {
    checkedStatus: { inStock: boolean; outOfStock: boolean };
    handleChecked: (status: "inStock" | "outOfStock") => void;
    filters: any;
    brands: { id: number; name: string }[];
    sets: { id: number; setName: string }[];
    priceMin: number;
    priceMax: number;
    categoryName: string;
    onPriceChange: (min: number, max: number) => void;
    onFilterChange: (key: keyof FiltersType, value: any) => void;
    resetFilters: () => void;
}


export const Filters: React.FC<FiltersProps> = ({
    checkedStatus,
    handleChecked,
    filters,
    brands,
    sets,
    onFilterChange,
    resetFilters,
    priceMin,
    priceMax,
    categoryName
}) => {
    return (
        <FiltersContainer>
            <h1>Filters</h1>
            <StockStatus
                handleChecked={handleChecked}
                checkedStatus={checkedStatus}
            />
            <BrandFilter
                brands={brands}
                onFilterChange={onFilterChange}
                filters={filters}

            />
            { categoryName !== "Board Games" && <SetFilter sets={sets} filters={filters} onFilterChange={onFilterChange} />}
            <PriceSlider
                filters={filters}
                priceMin={priceMin}
                priceMax={priceMax}
                selectedPriceMin={filters.priceMin || priceMin}
                selectedPriceMax={filters.priceMax || priceMax}
                onPriceChange={(min: any, max: any) => {
                    onFilterChange("priceMin", min);
                    onFilterChange("priceMax", max);
                }}
            />
            <Button variant='secondary' onClick={resetFilters}>Reset Filters</Button>
        </FiltersContainer>
    );
};

const FiltersContainer = styled.div`
    margin: 1.8rem;
    color: black;
    text-align: left;
    display: flex;
    flex-direction: column;
    h1 {
        font-family: Cinzel, serif;
        font-size: 27px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.018em;
        padding-bottom: 0.9rem;
        color: black;
        text-align: left;
        margin: 0;
    }
`;


