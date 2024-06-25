import React from 'react';
import { styled } from '@mui/material';
import { RegisterIcon } from '../svg';
import { Link } from 'react-router-dom';

export const Register = () => (
    <Link to="/create-account">
        <RegisterContainer>
            <RegisterIcon />
            Register
        </RegisterContainer>
    </Link>
);

const RegisterContainer = styled('span')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 1rem;
    font-weight: 500;
    padding: 0.75rem 0.25rem 0.75rem 0.25rem;
`;
