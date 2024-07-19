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
                    <label htmlFor="inStock">In Stock</label>
                    <Checkbox
                        type="checkbox"
                        checked={checkedStatus.inStock}
                        onChange={() => handleChecked('inStock')}
                        id="inStock"
                    />
                </FilterOption>
                <FilterOption display={false}>
                    <label htmlFor="outOfStock">Out of Stock</label>
                    <Checkbox
                        checked={checkedStatus.outOfStock}
                        type="checkbox"
                        onChange={() => handleChecked('outOfStock')}
                        id="outOfStock"
                    />
                </FilterOption>
            </FancyContainer>
        </FilterSection>
    );
};

const FilterSection = styled.div`
    margin-bottom: 2rem;
`;

const FilterTitle = styled.p`
    font-family: Cinzel, serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    color: black;
    line-height: 2;
    border-bottom: 1px solid #e5def9;
`;

const FilterOption = styled.div<{ display: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: ${({ display }) => (display ? '1px solid #e5def9' : 'none')};

    input {
        margin-right: 0.5rem;
    }

    label {
        font-family: Barlow;
        font-size: 18px;
        font-weight: 400;
        line-height: 21.6px;
        letter-spacing: 0.02em;
        color: black;
    }
`;
