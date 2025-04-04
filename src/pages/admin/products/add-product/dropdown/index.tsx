import React from 'react';
import styled from 'styled-components';
import { ChevronUp } from '../../../../../components/svg/chevron-up';

export const ProductDropdown = ({
    label,
    handleDropdownToggle,
    handleDropdownChange,
    toggleValue,
    isDropdownOpen,
    header,
    values,
    selectedValue,
    displayField,
    showClearOption = true,
}: any) => {
    return (
            <FormGroup>
                <Label htmlFor={label}>{label}</Label>
                <Select onClick={() => handleDropdownToggle(toggleValue)}>
                    <DropdownHeader>
                        {header}
                        <ChevronContainer isDropdownOpen={isDropdownOpen}>
                            <ChevronUp stroke="#C79D0A" />
                        </ChevronContainer>
                    </DropdownHeader>
                    {isDropdownOpen && (
                        <DropdownList>
                            {showClearOption && (
                                <DropDownOption
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDropdownChange(selectedValue, null);
                                    }}
                                >
                                    Clear Selection
                                </DropDownOption>
                            )}
                            {values.map((value: any) => (
                                <DropDownOption
                                    key={value.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDropdownChange(selectedValue, value.id);
                                    }}
                                >
                                    {value[displayField]}
                                </DropDownOption>
                            ))}
                        </DropdownList>
                    )}
                </Select>
            </FormGroup>
    );
};

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const Select = styled.div`
    position: relative;
    width: 100%;
`;

const DropdownHeader = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.5rem;
    border: 1px solid #4d3c7b;
    background-color: #160d35;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChevronContainer = styled.div<{ isDropdownOpen: boolean }>`
    transition: transform 0.3s ease;
    transform: ${(props) => (props.isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    width: 100%;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
`;

const DropDownOption = styled.li`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.5rem;
    background-color: #160d35;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }

    &:disabled {
        cursor: not-allowed;
        color: #999;
    }
`;
