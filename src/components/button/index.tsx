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

const getBackgroundColor = (variant?: string) => {
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

const getHoverStyles = (variant?: string) => {
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

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    size,
    variant,
    pathname,
    link,
    type,
    children,
}) => (
    <StyledButton type={type} variant={variant} size={size} onClick={onClick}>
        {variant === 'text' ||
        variant === 'none' ||
        (link && variant === 'secondary') ? (
            <StyledLink type={type} variant={variant} to={pathname as string}>
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
    color: white;
    font-size: 14px;
    line-height: 19.2px;
    text-align: left;
    z-index: 50;
    text-decoration: ${({ variant }) => getTextDecoration(variant)};
    font-family: ${({ variant }) => getFontFamily(variant)};
    font-weight: ${({ variant }) => getFontWeight(variant)};

    &:hover {
        ${({ variant }) => getHoverStyles(variant)}
    }
`;

const StyledButton = styled.button<{ variant?: string; size?: string }>`
    font-family: Cinzel;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    border: none;
    border-radius: 3px;
    color: white;
    z-index: 50;
    &:hover {
        ${({ variant }) => getHoverStyles(variant)}
    }

    background-color: ${({ variant }) => getBackgroundColor(variant)};

    width: ${({ size }) => {
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
