import React from 'react';
import styled from 'styled-components';
import { StockStatus } from './stock-status';
import Button from '../button';
import { BrandFilter } from './brand-filter';
import { PriceSlider } from './price-filter';
import { SetFilter } from './set-filters';
import { RarityFilter } from './rarity-filter';
import { PreorderFilter } from './preoder-filters';

export interface FiltersType {
    brandId?: number[];
    setId?: number[];
    rarityId?: number[];
    inStockOnly?: boolean;
    outOfStockOnly?: boolean;
    preorderOnly?: boolean;
    priceMin?: number;
    priceMax?: number;
}

interface FiltersProps {
    filters: FiltersType;
    brands: { id: number; name: string }[];
    sets: { id: number; setName: string; }[];
    rarities: { id: number; name: string }[];
    categoryName: string;
    onPriceChange: (min: number, max: number) => void;
    onFilterChange: (key: keyof FiltersType | 'priceMin' | 'priceMax', value: any) => void;
    resetFilters: () => void;
    priceMin: number;
    priceMax: number;
}

export const Filters: React.FC<FiltersProps> = ({
    filters,
    brands,
    sets,
    rarities,
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
                filters={filters}
                onFilterChange={onFilterChange}
            />
            <PreorderFilter
                filters={filters}
                onFilterChange={onFilterChange}
            />
            {brands.length > 0 && (
                <BrandFilter
                    brands={brands}
                    onFilterChange={onFilterChange}
                    filters={filters}
                />
            )}
            {categoryName !== "Board Games" && sets.length > 0 && (
                <SetFilter
                    sets={sets}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
            )}
            {categoryName !== "Board Games" && categoryName !== "Card Games" && rarities.length > 0 && (
                <RarityFilter
                    rarities={rarities}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
            )}
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
