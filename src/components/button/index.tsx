import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
    <StyledButton onClick={onClick}>
        {label}
    </StyledButton>
);

export default Button;

const StyledButton = styled.button`
    font-family: Cinzel;
    font-size: 14px;
    font-weight: 700;
    line-height: 18.87px;
    text-align: left;
    background: #C79D0A;
    border: none;
    padding: 0.5rem;
    border-radius: 3px;
    margin: 0.75rem;
`;
