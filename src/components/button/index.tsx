import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { To } from 'react-router-dom';
type Variant = 'primary' | 'secondary' | 'text';
interface ButtonProps {
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: string;
    variant?: string;
    pathname?: To;
    link?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    size,
    variant,
    pathname,
    link,
}) => (
    <StyledButton variant={variant} size={size} onClick={onClick}>
        {variant === 'text' || link && variant === 'secondary' ? (
            <StyledLink variant={variant} link={link} to={pathname as string}>
                {label}
            </StyledLink>
        ) : (
            label
        )}
    </StyledButton>
);

export default Button;

const StyledLink = styled(Link)<ButtonProps>`
    color: white;
    font-size: 14px;
    line-height: 19.2px;
    text-align: left;
    text-decoration: ${({ variant }: ButtonProps) => {
        switch (variant) {
            case 'primary':
                return 'none';
            case 'secondary':
                return 'none';
            case 'text':
                return 'underline';
            default:
                return 'none';
        }
    }};
    font-family: ${({ variant }: ButtonProps) => {
        switch (variant) {
            case 'primary':
                return 'Cinzel';
            case 'secondary':
                return 'Cinzel';
            case 'text':
                return 'Barlow';
            default:
                return 'Cinzel';
        }
    }};

    font-weight: ${({ variant }: ButtonProps) => {
        switch (variant) {
            case 'primary':
                return '700';
            case 'secondary':
                return '700';
            case 'text':
                return '400';
            default:
                return 'Cinzel';
        }
    }};
`;

const StyledButton = styled.button<ButtonProps>`
    font-family: Cinzel;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    border: none;
    border-radius: 3px;
    &:hover {
        color: white;
    }

    background-color: ${({ variant }: any) => {
        switch (variant) {
            case 'primary':
                return '#D4B05F';
            case 'secondary':
                return '#AC8FFF';
            case 'text':
                return 'transparent';
            default:
                return '#D4B05F';
        }
    }};

    width: ${({ size }: any) => {
        switch (size) {
            case 'small':
                return '150px';
            case 'medium':
                return '250px';
            default:
                return '0 16px';
        }
    }};

    height: ${({ size }: any) => {
        switch (size) {
            case 'small':
                return '40px';
            case 'medium':
                return '250px';
            default:
                return '0 16px';
        }
    }};
`;
