import React from 'react';
import { UserIcon } from '../svg';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context';

export const Login = () => {
    const { isAuthenticated } = useAppContext();
    return (
        <LoginContainer>
            {isAuthenticated ? (
                <Link to="/account/user-account">
                    <UserIcon isAuthenticated={isAuthenticated} />
                </Link>
            ) : (
                <Link to="/account/login">
                    <UserIcon isAuthenticated={isAuthenticated} />
                </Link>
            )}
        </LoginContainer>
    );
};

const LoginContainer = styled('span')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.75rem 0.25rem 0.75rem 0.5rem;
`;
