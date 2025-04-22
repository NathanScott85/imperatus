import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer } from '../../components/styled';
import { FancyContainer } from '../../components/fancy-container';
import { mediaQueries } from '../../styled/breakpoints';
// import Reviews from '../../components/reviews';

export const AboutUs = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="About us" />
        <MainContainer>
            <Section>
                <HeadingText>Imperatus Games</HeadingText>
                <FancyContainer variant="small" size="small">
                    <ContentContainer>
                        <ContentText>
                            At Imperatus Games, we believe every game tells a
                            story and every story is an adventure waiting to
                            unfold. Founded with a passion for bringing people
                            together through the magic of card and board games,
                            we are dedicated to providing immersive gaming
                            experiences for both seasoned gamers and newcomers
                            alike.
                            <br />
                            Initially, our carefully curated selection will be
                            available exclusively online, with every purchase
                            directly contributing toward opening our physical
                            gaming café.
                            <br />
                            Our ultimate mission is to cultivate memorable
                            experiences in a vibrant, community-focused space
                            where friendships flourish, creativity thrives, and
                            connections extend far beyond the tabletop.
                            <br />
                            Explore our expansive collection of games, support
                            our vision with each purchase, and become part of
                            the Imperatus journey. With Imperatus Games, every
                            play brings us one step closer to sharing
                            extraordinary moments in person. Welcome to the next
                            chapter in gaming.
                        </ContentText>
                    </ContentContainer>
                </FancyContainer>
            </Section>
            {/* <Reviews /> */}
            {/* <p>Replace with Latest Products</p> */}
        </MainContainer>
        <Footer />
    </>
);

const HeadingText = styled.h1`
    font-family: Cinzel;
    font-size: 40px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.1em;
    text-align: center;
    color: #c79d0a;
    margin: 0;
    ${mediaQueries('sm')`
         font-family: Cinzel;
    font-size: 35px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.1em;
    text-align: center;
    margin: 0;
    `};
`;

const ContentText = styled.p`
    font-size: 16px;
    line-height: 1.4;
    text-align: center;
    color: white;
    margin: 20px 0 0 0;
    padding: 0.5rem;
    word-spacing: 4px;
    ${mediaQueries('sm')`
        font-family: Barlow;
        text-align: center;
        color: white;
        margin: 0;
    `};
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 1.5rem;
    margin: 1.5rem;
`;
