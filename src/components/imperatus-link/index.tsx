import React from 'react';
import { Link } from 'react-router-dom';
import { Imperatus } from '../svg';
import { styled } from '@mui/material';

export const ImperatusLink = () => (
    <ImperatusLinkContainer to="/">
        <Imperatus />
    </ImperatusLinkContainer>
);

const ImperatusLinkContainer = styled(Link)`
    display: flex;
`;

