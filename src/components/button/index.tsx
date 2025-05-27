import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { To } from 'react-router-dom';

interface ButtonProps {
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: 'small' | 'medium' | 'xsmall';
    variant?: 'primary' | 'secondary' | 'text' | 'none';
    pathname?: To;
    link?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
    children?: React.ReactNode;
    disabled?: boolean;
}

const getTextDecoration = (variant?: string) => {
    switch (variant) {
        case 'text':
            return 'underline';
        default:
            return 'none';
    }
};

const getFontFamily = (variant?: string) => {
    switch (variant) {
        case 'text':
            return 'Barlow';
        case 'none':
            return 'Barlow';
        default:
            return 'Cinzel';
    }
};

const getFontWeight = (variant?: string) => {
    switch (variant) {
        case 'primary':
        case 'secondary':
            return '700';
        default:
            return '400';
    }
};

const getBackgroundColor = (variant?: string, disabled?: boolean) => {
    if (disabled) {
        return variant === 'text' || variant === 'none'
            ? 'transparent'
            : '#D3D3D3';
    }
    switch (variant) {
        case 'primary':
            return '#D4B05F';
        case 'secondary':
            return '#AC8FFF';
        case 'text':
        case 'none':
            return 'transparent';
        default:
            return '#C79D0A';
    }
};

const getHoverStyles = (variant?: string, disabled?: boolean) => {
    if (disabled) return '';
    switch (variant) {
        case 'primary':
            return 'color: black; background-color: #C79D0A;';
        case 'secondary':
            return 'color: black; background-color: #AC8FFF;';
        case 'text':
            return 'color: #AC8FFF; background-color: transparent;';
        case 'none':
            return 'color: #C79D0A; background-color: transparent;';
        default:
            return 'color: #AC8FFF; background-color: #C79D0A;';
    }
};

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    size,
    variant,
    pathname = undefined,
    link,
    type = 'button',
    children,
    disabled,
}) => (
    <StyledButton
        type={type}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
    >
        {variant === 'text' ||
        variant === 'none' ||
        (link && variant === 'secondary') ? (
            <StyledLink
                type={type}
                variant={variant}
                to={pathname as string}
                disabled={disabled}
            >
                {label}
            </StyledLink>
        ) : (
            label
        )}
        {children}
    </StyledButton>
);

export default Button;

const StyledLink = styled(Link)<ButtonProps>`
    color: ${({ disabled }) => (disabled ? '#A9A9A9' : 'white')};
    font-size: 14px;
    line-height: 19.2px;
    text-align: left;
    z-index: 50;
    text-decoration: ${({ variant }) => getTextDecoration(variant)};
    font-family: ${({ variant }) => getFontFamily(variant)};
    font-weight: ${({ variant }) => getFontWeight(variant)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    &:hover {
        ${({ variant, disabled }) => getHoverStyles(variant, disabled)}
    }
`;

const StyledButton = styled.button<{
    variant?: string;
    size?: string;
    disabled?: boolean;
}>`
    font-family: Cinzel;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    border: none;
    border-radius: 3px;
    padding: 0.75rem;
    color: ${({ disabled }) => (disabled ? '#A9A9A9' : 'white')};
    z-index: 1;
    // pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    &:hover {
        ${({ variant, disabled }) => getHoverStyles(variant, disabled)}
    }

    background-color: ${({ variant, disabled }) =>
        getBackgroundColor(variant, disabled)};

     width: ${({ size, disabled }) => {
         if (disabled) return 'auto'; // Set width to auto when disabled
         switch (size) {
             case 'xsmall':
                 return '100px';
             case 'small':
                 return '150px';
             case 'medium':
                 return '250px';
             default:
                 return 'auto';
         }
     }};
    }};

    height: ${({ size }) => {
        switch (size) {
            case 'xsmall':
                return '30px';
            case 'small':
                return '40px';
            case 'medium':
                return '50px';
            default:
                return 'auto';
        }
    }};
`;
