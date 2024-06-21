import React from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import {Container,  MainContainer } from '../../components/styled';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';


export const CardGames = () => {
    return (
        <>
   
             <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label='Card Games' />
            <Container>
                <Background />
            </Container>
            <MainContainer />
            <Footer />
        </>
    );
};


const Background = styled('div')`
    background: #130A30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;
