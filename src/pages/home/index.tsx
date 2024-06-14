import React from 'react';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ProductLinks } from './product-links';
import { ImageContainer, MainContainer, Container } from '../../components/styled';
import { Products } from '../../components/products';
import { latestproducts } from '../../lib/mocks'

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
            <Products products={latestproducts} />
        </MainContainer>
        <Footer />
    </>
);

