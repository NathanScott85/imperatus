import React from 'react';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { MainContainer } from '../../components/styled';
import { styled } from '@mui/material';
import HomeIMG from '../../components/svg/website-images/0_10.png';

export const Accessories = () => (
    <>
        <TopHeader />
        <Container>
            <ImageContainer />
        </Container>
        <Header />
        <Navigation />
        <MainContainer />
        <Footer />
    </>
);

const Container = styled('div')`
    color: #10000E;
    height: 625px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(to bottom, black, #05030F);
`;

const ImageContainer = styled('div')`
    background-image: url(${HomeIMG});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
`;