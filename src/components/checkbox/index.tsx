import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    className?: string;
    checked: boolean;
    onChange: () => void;
    id: string;
    type: string;
}

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    z-index: 50;
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
    width: 18px;
    height: 18px;
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

export const Checkbox: React.FC<CheckboxProps> = ({
    className,
    checked,
    onChange,
    id,
    type,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange();
    };

    return (
        <CheckboxContainer className={className}>
            <HiddenCheckbox
                checked={checked}
                id={id}
                type={type}
                onChange={handleChange}
            />
            <StyledCheckbox
                checked={checked}
                onClick={(e: any) => handleChange(e)}
            >
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    );
};
