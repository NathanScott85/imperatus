import React from 'react';
import styled from 'styled-components';
import { generatePath, Link } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import Reviews from '../../components/reviews';
import { mediaQueries } from '../../styled/breakpoints';
import { cardgames } from '../../lib/card-games';

export const CardGames = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Card Games" />
        <CardGamesMain>
            <CategoriesContainer>
                <CategoriesFilterContainer>
                    <h1>Card Games</h1>
                    <FancyContainer variant="filters" size="filters">
                        <CategoriesFilter>
                            {cardgames
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((cardgame) => {
                                    const cardgames = cardgame
                                        ? generatePath(
                                              '/shop/card-games/cardgame/:id/:name',
                                              {
                                                  id: cardgame.id,
                                                  name: cardgame.name
                                                      .replace(/\s+/g, '-')
                                                      .toLowerCase(),
                                              },
                                          )
                                        : '';

                                    return (
                                        <CatergoriesWrapper key={cardgame.id}>
                                            <StyledLink to={cardgames}>
                                                {cardgame.name}
                                            </StyledLink>
                                        </CatergoriesWrapper>
                                    );
                                })}
                        </CategoriesFilter>
                    </FancyContainer>
                </CategoriesFilterContainer>
                <CategoriesListContainer>
                    {cardgames.map((cardgame) => {
                        const cardgames = cardgame
                            ? generatePath(
                                  '/shop/card-games/cardgame/:id/:name',
                                  {
                                      id: cardgame.id,
                                      name: cardgame.name
                                          .replace(/\s+/g, '-')
                                          .toLowerCase(),
                                  },
                              )
                            : '';
                        return (
                            <Link key={cardgame.id} to={cardgames}>
                                <CategoryItem>
                                    <ImageWrapper>
                                        <CategoryImage
                                            src={cardgame?.img}
                                            alt={cardgame?.name}
                                        />
                                    </ImageWrapper>
                                    <p>{cardgame?.name}</p>
                                </CategoryItem>
                            </Link>
                        );
                    })}
                </CategoriesListContainer>
            </CategoriesContainer>
            <Reviews />
        </CardGamesMain>
        <Footer />
    </>
);

const StyledLink = styled(Link)`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    color: white;
    &:hover {
        color: #d4b05f;
    }
`;

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
`;

const ImageWrapper = styled.div`
    padding: 1rem;
    width: 100%;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 298px;
    top: 630px;
    left: 584px;
    gap: 0px;
`;

const CategoryImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const CardGamesMain = styled(MainContainer)`
    flex-direction: column;
`;

const CategoriesFilterContainer = styled.div`
    h1 {
        color: white;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
`;

const CategoriesFilter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const CatergoriesWrapper = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    padding: 1rem;
    z-index: 50;
`;

const CategoriesListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2rem;
    ${mediaQueries('sm')`
        grid-template-columns: repeat(2, 1fr);
    `};
    ${mediaQueries('xl')`
        grid-template-columns: repeat(3, 1fr);
    `};
    p {
        color: white;
    }
`;

const CategoryItem = styled.div`
    border-radius: 12px;
    background: #160d35;
    padding: 1rem;

    text-align: left;
    padding: 0.4rem;
    text-align: center;
    border: 1px solid #ac8fff;
    &:hover {
        color: #ac8fff;
        border: 1px solid #d4b05f;
    }
    p {
        font-family: Barlow, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 16.8px;
        margin: 1rem;
    }
`;
