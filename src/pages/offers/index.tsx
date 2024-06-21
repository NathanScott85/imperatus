import React from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Container, MainContainer } from '../../components/styled';

export const Offers = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <BreadCrumb label='Offers' />
        <Container>
            <Background />
        </Container>
        <MainContainer>
        </MainContainer>
        <Footer />
    </>
);

const Background = styled('div')`
    background: #130A30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;