import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../checkbox';
import { FancyContainer } from '../../components/fancy-container';

interface StockStatusProps {
    filters: {
        inStockOnly?: boolean;
        outOfStockOnly?: boolean;
    };
    onFilterChange: (key: 'inStockOnly' | 'outOfStockOnly', value: boolean) => void;
}

export const StockStatus: React.FC<StockStatusProps> = ({
    filters,
    onFilterChange,
}) => {
    return (
        <FilterSection>
            <FilterTitle>Stock Status</FilterTitle>
            <FancyContainer variant="stock" size="stock">
                <FilterOption display>
                    <Checkbox
                        type="checkbox"
                        checked={filters.inStockOnly || false}
                        onChange={() =>
                            onFilterChange('inStockOnly', !filters.inStockOnly)
                        }
                        id="inStock"
                    />
                    <label htmlFor="inStock">In Stock</label>
                </FilterOption>
                <FilterOption display={false}>
                    <Checkbox
                        type="checkbox"
                        checked={filters.outOfStockOnly || false}
                        onChange={() =>
                            onFilterChange('outOfStockOnly', !filters.outOfStockOnly)
                        }
                        id="outOfStock"
                    />
                    <label htmlFor="outOfStock">Out of Stock</label>
                </FilterOption>
            </FancyContainer>
        </FilterSection>
    );
};

const FilterSection = styled.div`
    margin-bottom: 1rem;
`;

const FilterTitle = styled.p`
    font-family: Cinzel, serif;
    font-size: 16.2px;
    font-weight: 400;
    margin-bottom: 2rem;
    color: black;
    line-height: 1.7;
    border-bottom: 1px solid #e5def9;
`;

const FilterOption = styled.div<{ display: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.425rem;
    padding-bottom: 0.5rem;
    border-bottom: ${({ display }) => (display ? '1px solid #e5def9' : 'none')};

    input {
        margin-right: 0.425rem;
    }

    label {
        font-family: Barlow;
        font-size: 15.3px;
        font-weight: 400;
        line-height: 18.4px;
        letter-spacing: 0.017em;
        color: black;
        padding-left: 1rem;
    }
`;
