import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Loading } from '../../pages/loading';
import { Navigation } from '../../components/navigation';
import { Cart } from '../../components/svg';
import Button from '../../components/button';
import { Input } from '../../components/input';

interface Product {
    name: string;
    img: string;
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
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (!product) {
            setProduct(null);
        }
    }, [productid, product]);

    if (!product) {
        return <Loading />;
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <ProductPageMain>
                <ProductContentSection>
                    <ProductImageWrapper>
                        <ProductImage src={product?.img} alt={product?.name} />
                    </ProductImageWrapper>
                    <ProductContent>
                        <h1>{product.name}</h1>
                        <ProductPriceWrapper>
                            <ProductPrice>£{product.price}</ProductPrice>
                            <StyledRRP>RRP {product?.rrp}</StyledRRP>
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
                <GradientBorder>
                    <Diamond activeTab={activeTab} />
                </GradientBorder>
                <Tabs>
                    <TabButton
                        active={activeTab === 'description'}
                        onClick={() => handleTabClick('description')}
                    >
                        Product Description
                    </TabButton>
                    <TabButton
                        active={activeTab === 'delivery'}
                        onClick={() => handleTabClick('delivery')}
                    >
                        Delivery & Returns
                    </TabButton>
                    <TabButton
                        active={activeTab === 'whychooseus'}
                        onClick={() => handleTabClick('whychooseus')}
                    >
                        Why Choose Us
                    </TabButton>
                </Tabs>
                <TabContentContainer>
                    {activeTab === 'description' && (
                        <TabContent>
                            <p>{product.description}</p>
                        </TabContent>
                    )}
                    {activeTab === 'delivery' && (
                        <TabContent>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </p>
                        </TabContent>
                    )}
                    {activeTab === 'whychooseus' && (
                        <TabContent>
                            <p>{product.description}</p>
                        </TabContent>
                    )}
                </TabContentContainer>
                <GradientBorder />
            </ProductPageMain>
        </>
    );
};

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

const GradientBorder = styled.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(
        to right,
        #d4b05f 0%,
        #ac8fff 17.5%,
        #ac8fff 76.5%,
        #d4b05f 100%
    );
    margin: 1rem 0;
    position: relative;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 1rem 0;
`;

const TabButton = styled.button<{ active: boolean }>`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: bold;
    line-height: 29.66px;
    text-align: center;
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => (props.active ? '#000' : '#7f7f7f')};
    padding: 0.5rem 1rem;
    &:hover {
        color: #000;
    }
`;

const Diamond = styled.div<{ activeTab: string }>`
    position: absolute;
    bottom: -7px;
    left: ${(props) =>
        props.activeTab === 'description'
            ? 'calc(16.66% - 7.5px)'
            : props.activeTab === 'delivery'
              ? 'calc(50% + 20px)'
              : 'calc(83.33% + 7.5px)'};
    width: 15px;
    height: 15px;
    background: white;
    border: 2px solid #ac8fff;
    transform: rotate(45deg);
    z-index: 1;
`;

const TabContentContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 2rem;

    min-height: 200px;
    background: #fff;
`;

const TabContent = styled.div`
    font-family: Barlow;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;

    h1 {
        font-family: Cinzel;
        font-size: 18px;
        font-weight: 400;
        line-height: 29.66px;
        text-align: left;
        margin-bottom: 1rem;
    }
    p {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
        color: #000;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
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
    display: flex;
    border: 1px solid #d4b05f;
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
