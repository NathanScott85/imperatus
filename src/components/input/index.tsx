import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';

interface InputProps {
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: 'small' | 'medium';
    type?: string | number;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'search' | 'primary' | 'text' | 'none' | 'secondary' | 'birthday';
    className?: string;
    name?: string;
    value?: string | undefined;
    radio?: boolean;
    checked?: boolean;
    id?: string;
    required?: boolean;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    variant,
    className,
    name,
    value,
    onChange,
    type,
    radio,
    checked,
    id,
    required,
}) => {
    return (
        <Wrapper>
            <StyledInput
                type={radio ? 'radio' : type}
                value={value}
                name={name}
                className={className}
                variant={variant}
                placeholder={placeholder}
                onChange={onChange}
                checked={checked}
                radio={radio}
                id={id}
                required={required}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledInput = styled.input<InputProps>`
    ${({ radio }) =>
        radio &&
        css`
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        `}

    &:focus {
        outline: none;
        border: 1.5px solid #c79d0a;
        border-right: none;
    }
    &::placeholder {
        color: white;
        font-size: 12px;
    }

    &:focus::placeholder {
        color: transparent;
    }
    z-index: 50;

    ${({ variant }) =>
        variant === 'search' &&
        css`
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
            width: 320px;
            height: 33px;
            border: 1px solid rgba(172, 143, 255, 0.5);
            background-color: transparent;
            border-right: none;

            &:focus::placeholder,
            &:active::placeholder {
                color: transparent;
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
            margin-right: 0.5rem;
            font-size: 16px;
            flex: 1;
            margin-left: 0;
            border: none;

            background-color: transparent;
            color: white;
            &:focus {
                outline: none;
                border: none;
            }
            font-family: Barlow, serif;
            &::placeholder {
                color: white;
                font-size: 12px;
            }
            &:focus::placeholder {
                color: transparent;
            }
            &:active::placeholder {
                color: transparent;
            }
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

            text-indent: 5px;
        `}

    ${({ variant }) =>
        variant === 'birthday' &&
        css`
            margin-right: 0.5rem;
            font-size: 16px;
            flex: 1;
            margin-left: 0;
            padding: 0.5rem;
            border: 1px solid rgba(172, 143, 255, 0.5);
            background-color: transparent;
            color: white;
            &:focus {
                outline: none;
                border: 1px solid #c79d0a;
            }
            font-family: Barlow, serif;
            &::placeholder {
                color: white;
                font-size: 12px;
            }
            text-indent: 5px;
            width: 90px;
        `}
    ${({ variant }) =>
        variant === 'secondary' &&
        css`
            margin-right: 0.5rem;
            font-size: 16px;
            flex: 1;
            margin-left: 0;
            padding: 0.5rem;
            border: 1px solid rgba(172, 143, 255, 0.5);
            background-color: transparent;
            color: white;
            &:focus {
                outline: none;
                border: 1px solid #c79d0a;
            }
            font-family: Barlow, serif;
            &::placeholder {
                color: white;
                font-size: 12px;
            }
            text-indent: 5px;
            width: 325px;
        `}
`;
