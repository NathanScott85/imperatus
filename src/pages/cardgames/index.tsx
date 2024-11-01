import React, { useEffect } from 'react';
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
import { useCardGamesContext } from '../../context/cardgames';

const getCardGamePath = ( cardgame: any ) => {
    const cardgamePath = cardgame
        ? generatePath( '/shop/card-games/cardgame/:id/:name', {
            id: cardgame.id,
            name: cardgame.name.replace( /\s+/g, '-' ).toLowerCase(),
        } )
        : '';
    return { cardgamePath };
};

export const CardGames = () => {
    const { fetchCardGames, cardGames, loading, error } = useCardGamesContext();

    useEffect( () => {
        fetchCardGames();
    }, [fetchCardGames] );

    if ( error ) return <p>Error loading card games: {error.message}</p>;

    const sortedCardGames = cardGames.sort( ( a: any, b: any ) => a.name.localeCompare( b.name ) );

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Card Games" />
            <CardGamesMain>
                {loading ? (
                    <CategoriesContainer>
                        <FancyContainer variant="medium" size="medium">
                            <NoProductsMessage>
                                <p>Loading card games...</p>
                            </NoProductsMessage>
                        </FancyContainer>
                    </CategoriesContainer>
                ) : sortedCardGames.length === 0 ? (
                    <CategoriesContainer>
                        <FancyContainer>
                            <NoProductsMessage>
                                <p>No card games available at the moment.</p>
                            </NoProductsMessage>
                        </FancyContainer>
                    </CategoriesContainer>
                ) : (
                    <CategoriesContainer>
                        <CategoriesFilterContainer>
                            <h1>Card Games</h1>
                            <FancyContainer variant="filters" size="filters">
                                <CategoriesFilter>
                                    {sortedCardGames.map( ( cardgame: any ) => {
                                        const { cardgamePath } = getCardGamePath( cardgame );
                                        return (
                                            <CatergoriesWrapper key={cardgame.id}>
                                                <StyledLink to={cardgamePath}>
                                                    {cardgame.name}
                                                </StyledLink>
                                            </CatergoriesWrapper>
                                        );
                                    } )}
                                </CategoriesFilter>
                            </FancyContainer>
                        </CategoriesFilterContainer>
                        <CategoriesListContainer>
                            {sortedCardGames.map( ( cardgame: any ) => {
                                const { cardgamePath } = getCardGamePath( cardgame );

                                return (
                                    <Link to={cardgamePath} key={cardgame.id}>
                                        <CategoryItem>
                                            <ImageWrapper>
                                                <CategoryImage
                                                    src={cardgame.img?.url}
                                                    alt={cardgame?.name}
                                                />
                                            </ImageWrapper>
                                            <p>{cardgame?.name}</p>
                                        </CategoryItem>
                                    </Link>
                                );
                            } )}
                        </CategoriesListContainer>
                    </CategoriesContainer>
                )}
                <Reviews />
            </CardGamesMain>
            <Footer />
        </>
    );
};

// Styled Components

const NoProductsMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;
    width: 100%;
    p {
        height: 100%;
        color: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding: 6rem;
    }
`;

const StyledLink = styled( Link )`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    color: white;
    &:hover {
        color: #c79d0a;
    }
    p {
        margin: 1rem;
    }
    z-index: 50;
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
    height: 200px;
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

const CardGamesMain = styled( MainContainer )`
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
    z-index: 50;
`;

const CatergoriesWrapper = styled.div`
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    z-index: 50;
`;

const CategoriesListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2rem;
    ${mediaQueries( 'sm' )`
        grid-template-columns: repeat(2, 1fr);
    `};
    ${mediaQueries( 'xl' )`
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
        border: 1px solid #c79d0a;
    }
    p {
        font-family: Barlow, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 16.8px;
        margin: 1rem;
    }
`;
