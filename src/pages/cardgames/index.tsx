import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Container, MainContainer } from '../../components/styled';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Product } from '../../components/product';
import { products } from '../../lib/product-mocks';
import { Checkbox } from '../../components/checkbox'; // Adjust import path as per your project structure
import { FancyContainer } from '../../components/fancy-container';

type ProductType = {
    id: number;
    img: string;
    name: string;
    price: string;
    rrp: string;
    category: string;
    game: string;
};

export const CardGames = () => {
    const [checkedStatus, setCheckedStatus] = useState({
        inStock: false,
        outOfStock: false,
    });

    const handleChecked = (type: keyof typeof checkedStatus) => {
        setCheckedStatus((prevState) => {
            const newState = {
                ...prevState,
                [type]: !prevState[type],
            };
            return newState;
        });
    };

    return (
        <>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label="Card Games" />
            <Container>
                <Background />
            </Container>
            <CardGamesMain>
                <Content>
                    <FiltersContainer>
                        <h1>Filters</h1>
                        <FilterSection>
                            <FilterTitle>Stock Status</FilterTitle>
                            <FancyContainer variant="stock" size="stock">
                                <FilterOption display>
                                    <label htmlFor="inStock">In Stock</label>
                                    <Checkbox
                                        type="checkbox"
                                        checked={checkedStatus.inStock}
                                        onChange={() =>
                                            handleChecked('inStock')
                                        }
                                        id="inStock"
                                    />
                                </FilterOption>
                                <FilterOption display={false}>
                                    <label htmlFor="outOfStock">
                                        Out of Stock
                                    </label>
                                    <Checkbox
                                        checked={checkedStatus.outOfStock}
                                        type="checkbox"
                                        onChange={() =>
                                            handleChecked('outOfStock')
                                        }
                                        id="outOfStock"
                                    />
                                </FilterOption>
                            </FancyContainer>
                        </FilterSection>
                        <FilterList>
                            <FilterItem>BRAND</FilterItem>
                            <FilterItem>POKEMON SET</FilterItem>
                            <FilterItem>SINGLE CARDS</FilterItem>
                            <FilterItem>RARITY</FilterItem>
                            <FilterItem>PRODUCTS</FilterItem>
                            <FilterItem>ENERGY / TRAINER TYPE</FilterItem>
                        </FilterList>
                    </FiltersContainer>
                    <ProductsSection>
                        {products.length !== 0 ? (
                            <ProductsGrid>
                                {products.map((product: ProductType) => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </ProductsGrid>
                        ) : (
                            <NoProductsMessage>
                                No products available, please check back later
                            </NoProductsMessage>
                        )}
                    </ProductsSection>
                </Content>
            </CardGamesMain>
            <Footer />
        </>
    );
};

const FiltersWrapper = styled(FancyContainer)``;
const CardGamesMain = styled.main`
    display: flex;
    flex-direction: row;
    background-color: white;
`;
const FiltersContainer = styled.div`
    color: black;
    text-align: left;
    margin: 2rem;
    border-bottom: 1px solid #e5def9;
    display: flex;
    flex-direction: column;
    align-items: left;
    h1 {
        font-family: Cinzel, serif;
        font-size: 30px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding-bottom: 1rem;
    }
`;

const FilterSection = styled.div`
    margin-bottom: 2rem;
`;

const FilterTitle = styled.p`
    font-family: Cinzel, serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    color: black;
    line-height: 2;
    border-bottom: 1px solid #e5def9;
`;

const FilterOption = styled.div<{ display: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: ${({ display }) => (display ? '1px solid #e5def9' : 'none')};
    input {
        margin-right: 0.5rem;
    }

    label {
        font-family: Barlow;
        font-size: 18px;
        font-weight: 400;
        line-height: 21.6px;
        letter-spacing: 0.02em;
        color: black;
    }
`;

const FilterList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FilterItem = styled.li`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 24.26px;
    letter-spacing: 0.02em;
    text-align: left;
    padding: 0.5rem 0rem 0.75rem 0rem;
    border-bottom: 1px solid #e5def9;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    margin: 1rem;
    background-color: white;
    height: 100vh;
    z-index: 0;
`;

const ProductsSection = styled.div`
    flex: 1;
    padding: 2rem;
`;

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    & > div {
        flex: 0 0 215px; /* Fixed width */
        max-width: 215px; /* Ensures that the width stays fixed */
    }
`;

const Background = styled.div`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;

const NoProductsMessage = styled.div`
    font-size: 18px;
    color: #777;
    text-align: center;
    margin-top: 20px;
    width: 100%;
`;

export default CardGames;
