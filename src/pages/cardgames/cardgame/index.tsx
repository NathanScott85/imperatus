// components/CardGame.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCategoriesContext } from '../../../context/categories';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { Products } from '../../../components/products';

export const CardGame = () => {
  const { id } = useParams();
  const { currentCategory } = useCategoriesContext();

  const cardgame = currentCategory?.products.find((game: any) => game.id === id);

  return (
    <>
      <TopHeader />
      <Header background />
      <Navigation background />
      {cardgame && <ImageContainer img={cardgame.img.url} />}
      <CardGameMain>
        <CardGameContainer>
          <FiltersContainer>
            {/* Filters Component */}
          </FiltersContainer>
          <CardGameListContainer>
            {/* Display products related to this cardgame */}
            {cardgame && <Products products={[cardgame]} />}
          </CardGameListContainer>
        </CardGameContainer>
      </CardGameMain>
      <Footer />
    </>
  );
};

const CardGameMain = styled.main`
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const CardGameContainer = styled.section`
  display: flex;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  flex: 1;
`;

const CardGameListContainer = styled.div`
  flex: 3;
`;

const ImageContainer = styled.div<{ img?: string }>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  height: 400px;
  width: 100%;
`;
