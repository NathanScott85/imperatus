import React from 'react';
import { Link } from 'react-router-dom';
import { Imperatus } from '../svg';
import { styled } from 'styled-components';

interface ImperatusLinkProps {
    width?: string;
    height?: string;
}
export const ImperatusLink = ({
    width = '175',
    height = '24',
}: ImperatusLinkProps) => (
    <ImperatusLinkContainer to="/">
        <Imperatus width={width} height={height} />
    </ImperatusLinkContainer>
);

const ImperatusLinkContainer = styled(Link)`
    display: flex;
`;
