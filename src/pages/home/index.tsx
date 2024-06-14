import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ProductLinks } from './product-links';
import { ImageContainer, MainContainer, Container } from '../../components/styled';
import { Products } from '../../components/products';
import { latestproducts } from '../../lib/mocks'
import { ImperatusBanner } from '../../components/banner';


export const Home = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <Container>
            <ImageContainer />
            <ProductLinks />
        </Container>
        <MainContainer>
            <Products label='Latest Products' products={latestproducts} />
            <Products label='Product Recomendations' products={latestproducts} />
            <ImperatusBanner />
        </MainContainer>
        <Footer />
    </>
);

