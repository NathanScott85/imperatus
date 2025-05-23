import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Products } from '../../components/products';
import { FancyContainer } from '../../components/fancy-container';
// import { Reviews } from '../../components/reviews';
import { Carousel } from '../../components/carousel';
import ArenaImage from '../../components/svg/website-images/0_71.png';
import { MainContainer } from '../../components/styled';
import { mediaQueries } from '../../styled/breakpoints';
import { useCarouselContext } from '../../context/carousel';
import { DeliveryInfo } from './delivery-info';
import { useProductsContext } from '../../context/products';

export const Home: React.FC = () => {
    const { carousel, loading, error, fetchCarousel } = useCarouselContext();
    const { latestLoading, latestProducts, fetchLatestProducts } =
        useProductsContext();

    useEffect(() => {
        fetchCarousel();
        fetchLatestProducts();
    }, [fetchCarousel, fetchLatestProducts]);

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            {loading && <p>Loading carousel...</p>}
            {error && <p>Error loading carousel: {error.message}</p>}
            {carousel && <Carousel items={carousel as any} />}

            <MainContainer>
                {latestLoading && <p>Loading latest products...</p>}
                {!latestLoading && latestProducts && (
                    <Products
                        label="Latest Products"
                        products={latestProducts}
                    />
                )}
                <Section>
                    <FancyContainer variant="small" size="small">
                        <ContentContainer>
                            <HeadingText>Imperatus Trading</HeadingText>
                            <HeadingText>Cards & Games</HeadingText>
                            <ContentText>
                                Imperatus Trading Cards & Games invites you to
                                immerse yourself in a world where strategy meets
                                collectible artistry. Step into our realm where
                                each card is not just a piece of the game but a
                                gateway to thrilling adventures and epic
                                battles. Whether you&apos;re a seasoned
                                collector or a novice explorer, Imperatus offers
                                a diverse array of trading cards and games that
                                cater to every level of player. Unveil the power
                                of your favorite characters, mastermind cunning
                                tactics, and forge alliances that will determine
                                the fate of entire realms.
                            </ContentText>
                        </ContentContainer>
                    </FancyContainer>
                </Section>
                <DeliveryInfo />
            </MainContainer>
            <Footer />
        </>
    );
};

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    background-image: url(${ArenaImage});
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;
    padding-bottom: 3rem;
    ${mediaQueries('md')`
        width: 100%;
        height: 35vh;
        padding: 0rem 0;
    `};
    ${mediaQueries('xl')`
        padding-left: 0rem;
        width: 100%;
        height: 65vh;
    `};
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

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

const ContentText = styled.p`
    font-size: 16px;
    line-height: 1.4;
    text-align: center;
    color: white;
    margin: 20px 0 0 0;
    word-spacing: 4px;
    ${mediaQueries('sm')`
        font-family: Barlow;
        text-align: center;
        color: white;
        margin: 0;
    `};
`;

const HeadingText = styled.h1`
    font-family: Cinzel;
    font-size: 40px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.1em;
    text-align: center;
    color: white;
    margin: 0;
    ${mediaQueries('sm')`
         font-family: Cinzel;
    font-size: 35px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.1em;
    text-align: center;
    color: white;
    margin: 0;
    `};
`;
