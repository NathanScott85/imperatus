import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer, Container } from '../../components/styled';

export const FourOFour = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <BreadCrumb label="404 Error, Page not found" />
        <Container>
            <Background />
        </Container>
        <MainContainer>404 Error, Page not found</MainContainer>
        <Footer />
    </>
);

const Background = styled('div')`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;