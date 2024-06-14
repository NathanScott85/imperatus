import React from 'react';
import styled from 'styled-components';
import ArenaImage from '../../components/svg/website-images/0_71.png';
import { DiamondSVGContainer } from '../../components/svg/filters-diamond';

export const ImperatusBanner = () => {
    return (
      <Section>
        <DiamondSVGContainer second>
          <foreignObject x="0" y="10" width="100%" height="100%">
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
          </foreignObject>
        </DiamondSVGContainer>
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
  
    @media (max-width: 768px) {
      padding: 1.5rem 0;
      font-size: 1.25rem;
    }
  
    @media (max-width: 480px) {
      padding: 1rem 0;
      font-size: 1rem;
    }
  `;
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
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
  `;