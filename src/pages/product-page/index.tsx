import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Loading } from '../../pages/loading';
import { Navigation } from '../../components/navigation';
import { Cart } from '../../components/svg';
import Button from '../../components/button';
import { Input } from '../../components/input';
import { Footer } from '../../components/footer';
import { ProductDescription } from './product-page-description';

interface Product {
    name: string;
    img: { url: string };
    price: number;
    rrp: number;
    description: string;
}

export const ProductPage: React.FC = () => {
    const { productid } = useParams<{ productid: string }>();
    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(
        location.state?.product || null,
    );

    useEffect(() => {
        if (!product) {
            setProduct(null);
        }
    }, [productid, product]);

    if (!product) {
        return <Loading />;
    }

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <ProductPageMain>
                <ProductContentSection>
                    <div>
                        <ProductImageWrapper>
                            <ProductImage
                                src={product?.img?.url}
                                alt={product.name}
                            />
                        </ProductImageWrapper>
                        <ProductImageSmallWrapper>
                            <ProductImageSmall
                                src={product?.img?.url}
                                alt={product.name}
                            />
                            <ProductImageSmall
                                src={product?.img?.url}
                                alt={product.name}
                            />
                            <ProductImageSmall
                                src={product?.img?.url}
                                alt={product.name}
                            />
                        </ProductImageSmallWrapper>
                    </div>
                    <ProductContent>
                        <h1>{product.name}</h1>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                £{product.price.toFixed(2)}
                            </ProductPrice>
                            <StyledRRP>RRP £{product.rrp.toFixed(2)}</StyledRRP>
                        </ProductPriceWrapper>
                        <CartContainer>
                            <CartWrapper>
                                <Cart />
                            </CartWrapper>
                            <p>In Stock</p>
                        </CartContainer>
                        <TitleAndStockContainer>
                            <StockContainer>
                                <ProductControls>+</ProductControls>
                                <Input type="number" />
                                <ProductControls>-</ProductControls>
                                <Button
                                    variant="primary"
                                    size="small"
                                    label="ADD TO CART"
                                />
                            </StockContainer>
                        </TitleAndStockContainer>
                    </ProductContent>
                </ProductContentSection>
                <ProductDescription product={product} />
            </ProductPageMain>
            <Footer />
        </>
    );
};

// Styled Components (unchanged)

const TitleAndStockContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ProductControls = styled.span`
    width: 25px;
    height: 25px;
    border-radius: 4px;
    font-size: 34px;
    text-align: center;
    background: #d9d9d9;
`;

const ProductPriceWrapper = styled.div`
    padding: 1.5rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StockContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid #e5def9;
    border-bottom: 1px solid #e5def9;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
    span {
        padding: 0 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
    }
    input {
        width: 50px;
        height: 25px;
        border: 1px solid #d9d9d9;
        margin: 0 0.5rem;
        text-align: center;
    }
`;

const StyledRRP = styled.span`
    color: black;
    text-decoration: line-through;
    padding-left: 1rem;
    font-family: Barlow;
    font-size: 16px;
    font-weight: bold;
`;

const ProductPrice = styled.p`
    font-family: Barlow;
    font-size: 26px;
    font-weight: 700;
    line-height: 31.2px;
    color: #c79d0a;
`;

const ProductPageMain = styled.main`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    margin: auto;
    width: 80%;
    h1 {
        color: #000000;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 400;
        line-height: 1.2;
        text-align: left;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
    }
`;

const CartContainer = styled.div`
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CartWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #d9d9d9;
    margin-top: 1rem;
`;

const ProductContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    padding: 0rem 2rem 0rem 5rem;
`;

const ProductContentSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    color: black;
    width: 100%;
    padding: 2rem;
`;

const ProductImageWrapper = styled.div`
    padding: 1rem;
    width: 400px;
    height: 400px;
    max-width: 100%;
    max-height: 100%;
    display: block;
    position: relative;
    border: 1px solid #c79d0a;
`;

const ProductImageSmallWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 165px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    justify-content: space-evenly;
    padding: 0.5rem;
`;

const ProductImageSmall = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border: 2px solid #d4b05f;
    border-radius: 8px;
    margin: 0.5rem;
`;

const ProductImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: 95%;
    height: 95%;
    object-fit: contain;
    padding: 0 !important;
    &:hover {
        transform: scale(0.9);
    }
`;
