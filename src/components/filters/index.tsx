import React from 'react';
import styled from 'styled-components';
import { StockStatus } from './stock-status';
import Button from '../button';
import { BrandFilter } from './brand-filter';

interface FiltersType {
    brandId?: number[];
    variantId?: number[];
    setId?: number[];
    productTypeId?: number[];
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
    variants: { id: number; name: string }[];
    productTypes: { id: number; name: string }[];
    onFilterChange: (key: keyof FiltersType, value: any) => void;
    resetFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
    checkedStatus,
    handleChecked,
    filters,
    brands,
    sets,
    variants,
    productTypes,
    onFilterChange,
    resetFilters,
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
            <FilterSection>
                <FilterTitle>Set</FilterTitle>
                <StyledSelect
                    value={filters.setId || []}
                    onChange={(e) => {
                        const selectedValue = parseInt(e.target.value);
                        onFilterChange("setId", filters.setId?.includes(selectedValue)
                            ? filters.setId.filter((id: number) => id !== selectedValue) // Deselect if already selected
                            : [...(filters.setId || []), selectedValue] // Add if not selected
                        );
                    }}
                >
                    <option value="">All Sets</option>
                    {sets.map((set) => (
                        <option key={set.id} value={set.id}>
                            {set.setName}
                        </option>
                    ))}
                </StyledSelect>

            </FilterSection>
            <FilterSection>
                <FilterTitle>Variant</FilterTitle>
                <StyledSelect
                    value={filters.variantId || ""}
                    onChange={(e) => onFilterChange("variantId", e.target.value ? parseInt(e.target.value) : null)}
                >
                    <option value="">All Variants</option>
                    {variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                            {variant.name}
                        </option>
                    ))}
                </StyledSelect>
            </FilterSection>
            <FilterSection>
                <FilterTitle>Product Type</FilterTitle>
                <StyledSelect
                    value={filters.productTypeId || ""}
                    onChange={(e) => onFilterChange("productTypeId", e.target.value ? parseInt(e.target.value) : null)}
                >
                    <option value="">All Product Types</option>
                    {productTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </StyledSelect>
            </FilterSection>
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

const FilterSection = styled.div`
    margin-bottom: 1.35rem;
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    text-align: left;
`;

const FilterTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 16.2px;
    font-weight: 400;
    margin-bottom: 0.45rem;
    color: black;

`;

const StyledSelect = styled.select`
    width: 100%;
    padding: 0.45rem;
    border-radius: 4.5px;
    border: 1px solid #e5def9;
    font-size: 14.4px;
    cursor: pointer;
`;

