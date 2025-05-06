import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Cart, Van } from '../../components/svg';
import Button from '../../components/button';
import { Input } from '../../components/input';
import { Footer } from '../../components/footer';
import { ProductDescription } from './product-page-description';
import { BreadCrumb } from '../../components/breadcrumbs';
import { useProductsContext } from '../../context/products';
import { Loading } from '../loading';
import { useBasketContext } from '../../context/basket';

export const ProductPage: React.FC = () => {
    const { productid } = useParams<{ productid: string }>();
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const { product, setProduct, fetchProductById, loading, error } =
        useProductsContext();
    const { addToBasket } = useBasketContext();

    const hasFetched = useRef(false);
    console.log(product, 'product');
    useEffect(() => {
        if (location.state?.product) {
            setProduct(location.state.product);
        } else if (productid && !hasFetched.current) {
            hasFetched.current = true;
            fetchProductById(productid);
        }
    }, [productid, setProduct, fetchProductById, location.state]);

    if (loading) return <Loading />;
    if (error) return <p>Error fetching product</p>;

    if (!product) {
        navigate('/404', { replace: true });
        return null;
    }

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) setQuantity(value);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb />
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
                            {product.rrp && (
                                <StyledRRP>
                                    RRP £{product.rrp.toFixed(2)}
                                </StyledRRP>
                            )}
                            <StyledRRP>19.60% OFF</StyledRRP>
                        </ProductPriceWrapper>
                        <CartContainer>
                            <CartWrapper>
                                <Cart stroke="black" />
                            </CartWrapper>
                            {product.stock.amount > 0 ? (
                                <p>In Stock</p>
                            ) : (
                                <p>Sold out</p>
                            )}
                        </CartContainer>
                        <CartContainer>
                            <CartWrapper>
                                <Van stroke="black" />
                            </CartWrapper>
                            <p>
                                Dispatched day before release, together with all
                                other items in your order.
                            </p>
                        </CartContainer>
                        <TitleAndStockContainer>
                            <StockContainer>
                                <ButtonGroup>
                                    <ArrowButton onClick={decrease}>
                                        −
                                    </ArrowButton>
                                    <Input
                                        type="number"
                                        name={`quantity-${product.id}`}
                                        id={`quantity-${product.id}`}
                                        label="Quantity"
                                        variant="secondary"
                                        size="small"
                                        value={String(quantity)}
                                        onChange={handleQuantityChange}
                                    />
                                    <ArrowButton onClick={increase}>
                                        +
                                    </ArrowButton>
                                </ButtonGroup>

                                <span>
                                    <Button
                                        variant="primary"
                                        size="small"
                                        label="add to cart"
                                        onClick={() =>
                                            addToBasket({
                                                productId: product.id,
                                                name: product.name,
                                                price: product.price,
                                                quantity,
                                                img: product.img,
                                            })
                                        }
                                    />
                                </span>
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

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    input {
        width: 45px;
        height: 35px;
        text-align: center;
        font-size: 1.2rem;
        color: black;
        border-radius: 4px;
        padding: 0.75rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const TitleAndStockContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ArrowButton = styled.button`
    background-color: #d4b05f;
    color: white;
    font-weight: 600;
    width: 35px;
    height: 35px;
    font-size: 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid #d4b05f;

    &:hover {
        background-color: #c79d0a;
        border: 2px solid #c79d0a;
        color: black;
    }
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
    p {
        font-size: 1.2rem;
        margin-left: 0.5rem;
    }
`;

const CartWrapper = styled.div`
    width: 40px;
    height: 40px;
    min-width: 45px;
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
