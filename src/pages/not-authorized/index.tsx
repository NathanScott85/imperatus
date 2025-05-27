import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { Footer } from '../components/footer';
// import Logo from '../components/logo';
import { LogoDragon } from '../../components/svg/logo';

export const NotAuthorized = () => {
    return (
        <Wrapper>
            {/* <Logo /> */}
            <LogoDragon />
            <Message>🚫 You’re not authorized to access this page.</Message>
            <StyledLink to="/">Return to Home</StyledLink>
            {/* <Footer /> */}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #130a30;
    color: white;
    padding: 2rem;
    text-align: center;
`;

const Message = styled.h1`
    font-size: 1.75rem;
    margin: 2rem 0;
`;

const StyledLink = styled(Link)`
    font-size: 1rem;
    color: #d4b05f;
    text-decoration: underline;
`;
