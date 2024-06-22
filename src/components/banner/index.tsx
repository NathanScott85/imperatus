import React from 'react';
import styled from 'styled-components';
import ArenaImage from '../../components/svg/website-images/0_71.png';
import { ImperatusBanner as DiamondBox } from '../../components/svg/filters-diamond';
import { mediaQueries } from '../../styled/breakpoints';

export const ImperatusBanner = () => {
    return (
      <Section>
        <DiamondBox>
            <Container>
              <HeadingText>
                Imperatus Trading
              </HeadingText>
              <HeadingText>
                Cards & Games
              </HeadingText>
              <ContentText>
                Imperatus Trading Cards & Games invites you to immerse yourself in a world where strategy meets collectible artistry.
                Step into our realm where each card is not just a piece of the game but a gateway to thrilling adventures and epic battles.
                Whether you're a seasoned collector or a novice explorer, Imperatus offers a diverse array of trading cards
                and games that cater to every level of player. Unveil the power of your favorite characters, mastermind cunning tactics, and forge alliances that will determine the fate of entire realms.
              </ContentText>
            </Container>
        </DiamondBox>
      </Section>
    );
  }
  
  const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    background-color: white;
    padding: 7rem 0;
    background-image: url(${ArenaImage});
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat; 
 
   ${mediaQueries("md")`
        width: 100%;
        height: 35vh;
        padding: 0rem 0;
    `};
    ${mediaQueries("xl")`
        padding-left: 0rem;
        width: 100%;
        height: 100%;
    `};
  `;
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 500;
    box-sizing: border-box;
    ${mediaQueries("sm")`
      padding: 0;
    `};
    ${mediaQueries("md")`
        width: 100%;
        height: 100%
    `};
    ${mediaQueries("xl")`
        padding-left: 0rem;
        width: 100%;
        height: 100%
    `};
  `;
  
  const HeadingText = styled.h1`
    font-family: Cinzel;
    font-size: 45px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.1em;
    text-align: center;
    color: white;
    margin: 0;
  `;
  
  const ContentText = styled.p`
    font-size: 16px;
    line-height: 1.4;
    text-align: center;
    color: white;
    margin: 20px 0 0 0;
    ${mediaQueries("sm")`
      margin: 0;
    `};
  `;