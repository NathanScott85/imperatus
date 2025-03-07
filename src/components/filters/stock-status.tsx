import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../checkbox';
import { FancyContainer } from '../../components/fancy-container';

interface StockStatusProps {
    handleChecked: (status: 'inStock' | 'outOfStock') => void;
    checkedStatus: {
        inStock: boolean;
        outOfStock: boolean;
    };
}

export const StockStatus: React.FC<StockStatusProps> = ({
    handleChecked,
    checkedStatus,
}) => {
    return (
        <FilterSection>
            <FilterTitle>Stock Status</FilterTitle>
            <FancyContainer variant="stock" size="stock">
                <FilterOption display>
                <Checkbox
                        type="checkbox"
                        checked={checkedStatus.inStock}
                        onChange={() => handleChecked('inStock')}
                        id="inStock"
                    />
                    <label htmlFor="inStock">In Stock</label>
                </FilterOption>
                <FilterOption display={false}>
                <Checkbox
                        checked={checkedStatus.outOfStock}
                        type="checkbox"
                        onChange={() => handleChecked('outOfStock')}
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
