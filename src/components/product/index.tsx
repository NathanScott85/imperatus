import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import Button from '../button';
import { useProductsContext } from '../../context/products';
import { ProductType } from '../../types';

export const Product = ({ product: productProp }: { product?: ProductType }) => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { product, setProduct, loading, fetchProductById } = useProductsContext();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (productProp) {
            setProduct(productProp);
        } else if (location.state?.product) {
            setProduct(location.state.product);
        } else if (id && !hasFetched.current) {
            hasFetched.current = true;
            fetchProductById(id);
        }
    }, [id, productProp, setProduct, fetchProductById, location.state?.product]);

    const productToUse = productProp || product;

    if (!productToUse || loading) {
        return <p>loading...</p>;
    }

    return (
        <ProductContainer>
            <ProductWrapper>
                <NavLink
                    to={`/shop/categories/category/${productToUse.category.id}/${productToUse.category.slug}/${productToUse.id}/${productToUse.slug}`}
                    state={{ product: productToUse }}
                >
                    <ImageWrapper>
                        {productToUse.img?.url && <ProductImage src={productToUse.img?.url} alt={productToUse.name} />}
                    </ImageWrapper>
                    <ProductName>{productToUse.name}</ProductName>
                    <ProductPriceWrapper>
                        <ProductPrice>£{productToUse.price.toFixed(2)}</ProductPrice>
                        {productToUse.rrp && (
                            <StyledRRP>RRP £{productToUse.rrp.toFixed(2)}</StyledRRP>
                        )}
                    </ProductPriceWrapper>
                </NavLink>
                <Button label="Add to cart" variant="primary" size="small" />
            </ProductWrapper>
        </ProductContainer>
    );
};


const ProductContainer = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 12px;
    width: 200px;
    margin: 0.5rem;
    padding: 0.9rem;
    font-family: Cinzel;
    &:hover {
        border: 1px solid #c79d0a;
    }
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    &:hover {
        color: #ac8fff;
    }
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
