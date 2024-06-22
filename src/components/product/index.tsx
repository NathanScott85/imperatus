import React from 'react';
import styled from 'styled-components';
import Button from '../button';

type Product = {
  id: any;
  img: string;
  name: string;
  price: string;
  rrp: string;
  category: string;
  game: string;
};

interface ProductProps {
  product: Product;
}

export const Product = ({ product }: ProductProps) => {
  return (
    <ProductContainer>
      <ProductWrapper>
        <ImageWrapper>
          <ProductImage src={product?.img} alt={product?.name} />
        </ImageWrapper>
        <ProductName>{product?.name}</ProductName>
        <ProductPriceWrapper>
        <ProductPrice>£{product?.price}</ProductPrice>
        <StyledRRP>RRP {product?.rrp}</StyledRRP>
        </ProductPriceWrapper>
    
        <Button label="Add to cart" />
      </ProductWrapper>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  border: 1px solid #ac8fff;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  width: 200px;
  margin: 0.5rem;
  padding: 0.9rem;
  font-family: Cinzel;
  &:hover { 
        border: 1px solid #D4B05F;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
   &:hover { 
        color: #ac8fff;
  }
`;

const ImageWrapper = styled.div` /* Add packs prop type */
  padding: 1rem;
  width: 100%;
  height: 200px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
     &:hover { 
        transform: scale(1.1);
  }
`;

const ProductName = styled.span`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: center;
`;

const ProductPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ProductPrice = styled.span`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: left;
  padding: 0.4rem;
`;

const StyledRRP = styled.span`
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: left;
  color: grey;
  text-decoration: line-through;
  opacity: 0.5;
  padding: 0.4rem;
`;