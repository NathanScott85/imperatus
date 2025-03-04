import React, { useMemo } from "react";
import styled from "styled-components";

interface SetFilterProps {
    sets: { id: number; setName: string; }[];
    filters: any;
    onFilterChange: (key: "setId", value: number) => void;
}

export const SetFilter: React.FC<SetFilterProps> = ({ sets, filters, onFilterChange }) => {

    const filteredSets = useMemo(() => {
        if (!filters.brandId || filters.brandId.length === 0) return sets; 
        return sets.filter((set) => filters.brandId.includes(Number(set.id)));
    }, [sets, filters.brandId]);

    return (
        <FilterSection>
            <FilterTitle>Set</FilterTitle>
            <ScrollableList shouldScroll={filteredSets.length > 4}>
                {filteredSets.map((set) => (
                    <ListItem
                        key={set.id}
                        selected={filters.setId === set.id}
                        onClick={() => onFilterChange("setId", set.id)}
                    >
                        {set.setName}
                    </ListItem>
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

const ScrollableList = styled.div<{ shouldScroll: boolean }>`
    max-height: ${({ shouldScroll }) => (shouldScroll ? "144px" : "auto")};
    overflow-y: ${({ shouldScroll }) => (shouldScroll ? "auto" : "visible")};
    border: 1px solid #e5def9;
    border-radius: 4.5px;
    background: white;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f0eaff;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ac8fff;
        border-radius: 4px;
        border: none;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #8c6fd9;
    }
`;

const ListItem = styled.div<{ selected: boolean }>`
    font-family: Barlow;
    font-size: 15px;
    font-weight: 400;
    color: ${({ selected }) => (selected ? "white" : "black")};
    background: ${({ selected }) => (selected ? "#AC8FFF80" : "white")};
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background: #d1b3ff;
    }
`;

export default SetFilter;
