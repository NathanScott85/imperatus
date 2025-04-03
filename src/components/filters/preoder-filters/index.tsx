import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../checkbox';

interface PreorderFilterProps {
    filters: {
        preorderOnly?: boolean;
    };
    onFilterChange: (key: 'preorderOnly', value: boolean) => void;
}

export const PreorderFilter: React.FC<PreorderFilterProps> = ({
    filters,
    onFilterChange,
}) => {
    return (
        <FilterSection>
            <FilterTitle>Preorders</FilterTitle>
            <CheckboxWrapper>
                <FilterOption>
                    <Checkbox
                        type="checkbox"
                        checked={filters.preorderOnly || false}
                        onChange={() =>
                            onFilterChange('preorderOnly', !filters.preorderOnly)
                        }
                        id="preorderOnly"
                    />
                    <label htmlFor="preorderOnly">Preorder</label>
                </FilterOption>
            </CheckboxWrapper>
        </FilterSection>
    );
};

const FilterSection = styled.div`
    margin-bottom: 1.7rem;
`;

const FilterTitle = styled.p`
    font-family: Cinzel, serif;
    font-size: 15.3px;
    font-weight: 400;
    margin-bottom: 1rem;
    color: black;
`;

const CheckboxWrapper = styled.div`
    border: 1px solid #e5def9;
    border-radius: 4.5px;
    padding: 0.5rem;
    background: white;
`;

const FilterOption = styled.div`
    display: flex;
    align-items: center;

    input {
        margin-right: 0.5rem;
    }

    label {
        font-family: Barlow;
        font-size: 15px;
        font-weight: 400;
        line-height: 18.4px;
        letter-spacing: 0.017em;
        color: black;
        padding-left: 1rem;
    }
`;
