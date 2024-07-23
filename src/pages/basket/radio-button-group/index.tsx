import React from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/input';

interface RadioButtonGroupProps {
    selectedRadio: string | null;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    selectedRadio,
    handleRadioChange,
}) => {
    return (
        <RadioButtonContainer>
            <RadioButtonWrapper>
                <Input
                    variant="primary"
                    radio
                    id="tracked"
                    name="delivery"
                    value="tracked"
                    checked={selectedRadio === 'tracked'}
                    onChange={handleRadioChange}
                />
                <Label htmlFor="tracked" checked={selectedRadio === 'tracked'}>
                    Tracked Delivery
                </Label>
            </RadioButtonWrapper>
            <RadioButtonWrapper>
                <Input
                    variant="primary"
                    radio
                    id="standard"
                    name="delivery"
                    value="standard"
                    checked={selectedRadio === 'standard'}
                    onChange={handleRadioChange}
                />
                <Label
                    htmlFor="standard"
                    checked={selectedRadio === 'standard'}
                >
                    Standard Delivery
                </Label>
            </RadioButtonWrapper>
        </RadioButtonContainer>
    );
};

const RadioButtonWrapper = styled.span`
    padding: 1rem;
`;

const RadioButtonContainer = styled.span`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
`;

const Label = styled.label<{ checked: boolean }>`
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding-left: 40px;
    line-height: 20px;
    width: 100%;
    font-size: 16px;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        border: 2px solid #d4b05f;
        border-radius: 50%;
        background: white;
    }

    &:after {
        content: '';
        position: absolute;
        left: 7px;
        top: 7px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #d4b05f;
        display: ${({ checked }) => (checked ? 'block' : 'none')};
    }
`;
