// components/CardGames.tsx
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
import { useCategoriesContext } from '../../context/categories';



export const CardGames = () => {
  const { currentCategory, loading, error } = useCategoriesContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading card games.</p>;

  return (
    <CardGamesMain>
      <CategoriesListContainer>
        {currentCategory?.products?.map((product: any) => (
          <Link
            key={product.id}
            to={`/shop/card-games/cardgame/${product.id}/${product.name}`}
          >
            <CategoryItem>
              <ImageWrapper>
                <CategoryImage src={product.img.url} alt={product.name} />
              </ImageWrapper>
              <p>{product.name}</p>
            </CategoryItem>
          </Link>
        ))}
      </CategoriesListContainer>
    </CardGamesMain>
  );
};

const CardGamesMain = styled(MainContainer)`
  flex-direction: column;
`;

const CategoriesListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const CategoryItem = styled.div`
  border-radius: 12px;
  background: #160d35;
  padding: 1rem;
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
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const CategoryImage = styled.img`
  max-width: 100%;
  height: auto;
  &:hover {
    transform: scale(1.1);
  }
`;
