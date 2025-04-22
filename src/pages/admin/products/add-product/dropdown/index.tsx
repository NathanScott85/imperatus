import React from 'react';
import styled from 'styled-components';
import { ChevronUp } from '../../../../../components/svg/chevron-up';
import { Tooltip } from '../../../../../components/tooltip';

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
    tooltip,
    tooltipMessage,
    onClear,
}: any) => {
    return (
        <FormGroup>
            <LabelWrapper>
                <Label htmlFor={label}>{label}</Label>
                {tooltip && <Tooltip message={tooltipMessage} />}
            </LabelWrapper>
            <Select onClick={() => handleDropdownToggle(toggleValue)}>
                <DropdownHeader>
                    {header}
                    <ChevronContainer isDropdownOpen={isDropdownOpen}>
                        <ChevronUp stroke="#C79D0A" />
                    </ChevronContainer>
                </DropdownHeader>
                {isDropdownOpen && (
                    <>
                        <DropdownBackdrop
                            onClick={() => handleDropdownToggle(toggleValue)}
                        />
                        <DropdownList>
                            {showClearOption && (
                                <DropDownOption
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDropdownChange(
                                            selectedValue,
                                            null,
                                        );
                                        if (onClear) onClear();
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
                                        handleDropdownChange(
                                            selectedValue,
                                            value.id,
                                        );
                                    }}
                                >
                                    {value[displayField]}
                                </DropDownOption>
                            ))}
                        </DropdownList>
                    </>
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

const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
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
    transform: ${(props) =>
        props.isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const DropdownList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #0f0728; // fully opaque dark
    border: 1px solid #4d3c7b;
    max-height: 200px;
    overflow-y: auto;
    z-index: 9999; // very high to sit above all
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.75);
`;

const DropDownOption = styled.li`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.75rem 1rem;
    background-color: #0f0728; // match dropdown bg
    color: white;
    cursor: pointer;
    display: block;
    width: 100%;
    user-select: none;

    &:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }

    &:disabled {
        cursor: not-allowed;
        color: #999;
    }
`;

const DropdownBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
    background: transparent;
`;
