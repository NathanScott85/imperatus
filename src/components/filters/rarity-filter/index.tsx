import React from 'react';
import styled from 'styled-components';

export const RarityFilter = ({ filters, rarities, onFilterChange }: any) => {
    const handleCheckboxChange = (rarityId: number) => {
        let updated = filters.rarityId ?? [];
        const idx = updated.indexOf(rarityId);

        if (idx !== -1) {
            updated.splice(idx, 1);
        } else {
            updated.push(rarityId);
        }

        onFilterChange('rarityId', updated.length > 0 ? updated : null);
    };

    return (
        <FilterSection>
            <FilterTitle>Rarity</FilterTitle>
            <ScrollableList>
                {rarities.map((rarity: any) => (
                    <CheckboxLabel key={rarity.id}>
                        <CheckboxContainer>
                            <HiddenCheckbox
                                checked={filters.rarityId?.includes(rarity.id)}
                                onChange={() => handleCheckboxChange(rarity.id)}
                            />
                            <StyledCheckbox checked={filters.rarityId?.includes(rarity.id)}>
                                <Icon viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </Icon>
                            </StyledCheckbox>
                        </CheckboxContainer>
                        {rarity.name}
                    </CheckboxLabel>
                ))}
            </ScrollableList>
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

const ScrollableList = styled.div`
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #e5def9;
    border-radius: 4.5px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    font-family: Barlow;
    font-size: 15px;
    font-weight: 400;
    color: black;
    cursor: pointer;
    margin-bottom: 0.3rem;
`;

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    z-index: 50;
    margin-right: 0.5rem;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    display: inline-block;
    width: 15.3px;
    height: 15.3px;
    background: ${({ checked }) => (checked ? '#ac8fff' : 'white')};
    border: ${({ checked }) => (checked ? 'none' : '1px solid #AC8FFF80')};
    border-radius: 3px;
    transition: all 150ms;
    cursor: pointer;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }

    ${Icon} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
`;