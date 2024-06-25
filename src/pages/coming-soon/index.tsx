import React from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Container, MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';

import { BreadCrumb } from '../../components/breadcrumbs';

export const ComingSoon = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <BreadCrumb label="Coming Soon" />
        <Container>
            <Background />
        </Container>
        <MainContainer />
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
