import React from 'react';
import { Timer } from '../../../components/svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DeliveryInfo = () => {
    return (
        <Section>
            <Timer />
            <Text>
                Delivery options available, checkout our <StyledLink to="/delivery">Delivery</StyledLink> page for more details.
            </Text>
        </Section>
    );
};

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    color: black;
    font-size: 1.5rem;
    margin: 1.5rem;
    white-space: nowrap;
`;

const Text = styled.p`
    color: white;
    font-weight: 400;
    font-family: Barlow;
    font-size: 1.2rem;
    margin-left: 0.75rem;
    display: flex;
    align-items: center;
`;

const StyledLink = styled(Link)`
    color: #c79d0a;
    font-size: 1.2rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    font-family: Barlow;
    line-height: 15px;
    letter-spacing: 0.1em;
    text-decoration: none;

    &:hover {
        color: white;
    }
`;
