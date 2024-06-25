import React from 'react';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { ProductLinks } from './product-links';
import { MainContainer, Container } from '../../components/styled';
import { Products } from '../../components/products';
import { latestproducts } from '../../lib/mocks';
import { ImperatusBanner } from '../../components/banner';
import { Reviews } from '../../components/reviews';

import HomeIMG from '../../components/svg/website-images/0_10.png';
import styled from 'styled-components';

export const Home = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <Container>
            <ImageContainer img={HomeIMG} />
            <ProductLinks />
        </Container>
        <MainContainer>
            <Products label="Latest Products" products={latestproducts} />
            <Products
                label="Product Recomendations"
                products={latestproducts}
            />
            <ImperatusBanner />
            <Reviews />
        </MainContainer>
        <Footer />
    </>
);

export const ImageContainer = styled.div<{ img?: any }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 7rem 0;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    background-position: top center;
`;
