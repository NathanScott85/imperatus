import React from 'react';
import { UserIcon } from '../svg';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const Login = () => (
    <Link to="/account/login">
        <LoginContainer>
            <UserIcon />
        </LoginContainer>
    </Link>
);

const LoginContainer = styled('span')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.75rem 0.25rem 0.75rem 0.5rem;
`;
