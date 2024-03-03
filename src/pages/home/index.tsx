import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ProductLinks } from './product-links';
import { ImageContainer, MainContainer, Container } from '../../components/styled';

export const Home = () => (
    <>
        <TopHeader />
        <Container>
            <ImageContainer />
        </Container>
        <Header />
        <Navigation />
        <MainContainer>
            <ProductLinks />
            <Section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestias, odio dolore non facilis odit, officia accusamus eius sapiente deserunt nulla explicabo asperiores sunt eum omnis fuga ea dolores ipsam.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, incidunt blanditiis cum voluptate ex maxime eos magnam itaque id vero maiores quisquam, est consequatur, laborum nihil quam. Quasi, dicta unde!
            </Section>
        </MainContainer>
        <Footer />
    </>
);

const Section = styled('section')`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #130A30;
    width: 100%;
    height: 100%;
    border: 3px solid red;
    color: #FFF;
    font-size: 1.5rem;
    background-color: #05030F;
`;
