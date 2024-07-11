import React from 'react';
import styled from 'styled-components';

export const Input = ({ placeholder }: any) => {
    return(
        <StyledInput placeholder={placeholder} />
    );
}

const StyledInput = styled.input`
    padding: 1.5rem 1rem;
    margin-right: 0.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 16px;
    border: 1px solid red;
    width: 333px;
    height: 35px;
    background: #130A30;

    border: 1px solid rgba(172, 143, 255, 0.5);
    color: white;
    &:focus {
        outline: none;
        border: 1.5px solid #D4B05F;
    }
    font-family: Barlow, serif;
    &::placeholder {
        color: white;
        font-size: 12px;
    }
    &:focus::placeholder {
        color: transparent;
    }
`;