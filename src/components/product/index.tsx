import React from 'react';
import styled from 'styled-components';
import Button from '../button';

type Product = {
    img: string;
    name: string;
    price: string;
    rrp: string;
}
interface ProductProps {
    product: Product
}

export const Product = ({ product }: ProductProps) => {
    return (
        <ProductContainer>
            <ProductWrapper>
                <ImageWrapper>
                    <ProductImage src={product?.img} alt={product?.name} />
                </ImageWrapper>
                <ProductName>{product?.name}</ProductName>
                <ProductPrice>{product?.price}</ProductPrice>
                <StyledRRP>RRP {product?.rrp}</StyledRRP>
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
  padding: 1rem;
  font-family: Cinzel;

  @media (max-width: 768px) {
    width: 150px;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.5rem;
    margin: 0.25rem;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ImageWrapper = styled.div`
  padding: 1rem;
  width: 75%;
  height: 75%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`;

const ProductName = styled.span`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 14.4px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    line-height: 12px;
  }
`;

const ProductPrice = styled.span`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  text-align: left;
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
`;
