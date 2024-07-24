import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer, Container } from '../../components/styled';
import { mediaQueries } from '../../styled/breakpoints';

export const SignOut = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Sign Out" />
        <MainContainer>
            <Section />
        </MainContainer>
        <Footer />
    </>
);

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
