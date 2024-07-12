import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';

interface InputProps {
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: 'small' | 'medium';
    type?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'search' | 'primary' | 'text' | 'none';
    className?: string;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    variant,
    className,
}) => {
    return (
        <StyledInput
            className={className}
            variant={variant}
            placeholder={placeholder}
        />
    );
};

const StyledInput = styled.input<InputProps>`
    padding: 1.45rem 1rem;
    margin-right: 0.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 16px;
    width: 320px;
    height: 35px;
    background: #130a30;
    border: 1px solid rgba(172, 143, 255, 0.5);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: white;

    font-family: Barlow, serif;

    &:focus {
        outline: none;
        border: 1.5px solid #d4b05f;
        border-right: none;
    }
    &::placeholder {
        color: white;
        font-size: 12px;
    }

    &:focus::placeholder {
        color: transparent;
    }

    ${({ variant }) =>
        variant === 'search' &&
        css`
            width: 320px;
            height: 33px;
            border: 1px solid rgba(172, 143, 255, 0.5);
            background-color: transparent;
            border-right: none;

            &:focus::placeholder,
            &:active::placeholder {
                color: transparent;
            }

            &:focus {
                border: 1px solid #d4b05f;
            }

            ${mediaQueries('md')`
                width: 280px;
            `}

            ${mediaQueries('lg')`
                width: 320px;
            `}

            ${mediaQueries('xl')`
                width: 550px;
            `}
        `}

    ${({ variant }) =>
        variant === 'primary' &&
        css`
            border: 1px solid rgba(172, 143, 255, 0.5);
            font-size: 1rem;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0em;
            flex: 1;
            text-align: left;
            caret-color: white;
            padding: 0.75rem 0.75rem 0.75rem 0;
            margin: 0 0.5rem;

            ::placeholder {
                color: #d3d3d3 !important;
                margin-left: 0.1rem;
                font-size: 1rem;
                color: #fff;
                font-family: Barlow;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }

            text-indent: 20px;
        `}
`;
