import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';

import { mediaQueries } from '../../styled/breakpoints';

export const ForgotPassword = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Forgot Password" />
            <MainContainer>
                <Section />
            </MainContainer>
            <Footer />
        </>
    );
};

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #130a30;
`;

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    min-height: 650px;
    color: black;
    font-size: 1.5rem;
    margin-bottom: 10rem;
    ${mediaQueries('sm')`
         flex-direction: column;
         align-items: center;
    `};
    ${mediaQueries('sm')`
        flex-direction: row;
        align-items: center;
   `};
`;
