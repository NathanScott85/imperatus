import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { LogoDragon } from '../svg/logo';
import { mediaQueries } from '../../styled/breakpoints';

export const ImperatusLink = () => (
    <ImperatusLinkContainer data-testid="imperatus-link" to="/">
        <LogoDragon />
    </ImperatusLinkContainer>
);

const ImperatusLinkContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;

    ${mediaQueries('sm')`
        width: 140px;
        height: 140px;
    `};

    ${mediaQueries('md')`
        width: 180px;
        height: 180px;
    `};

    ${mediaQueries('lg')`
        width: 160px;
        height: 160px;
    `};

    ${mediaQueries('xl')`
        width: 200px;
        height: 200px;
    `};
`;
