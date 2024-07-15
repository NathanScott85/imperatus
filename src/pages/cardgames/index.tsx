import React from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Container, MainContainer } from '../../components/styled';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Product } from '../../components/product';
import ObsidianFlames from '../../lib/mock-images/pokemon-obsidian.jpg';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';

const products = [
    {
        id: 1,
        category: 'card games',
        game: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    },

    {
        id: 2,
        category: 'card games',
        game: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    },
    {
        id: 3,
        category: 'card games',
        game: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    },
    {
        id: 4,
        category: 'card games',
        game: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    }
];

type Product = {
    id: number;
    img: string;
    name: string;
    price: string;
    rrp: string;
    category: string;
    game: string;
};

interface ProductsProps {
    products: Product[];
    label?: string;
}

export const CardGames = () => {
    return (
        <>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label="Card Games" />
            <Container>
                <Background />
            </Container>
            <MainContainer>
                <Content>
                    <FiltersContainer>
                        <h1>Filters</h1>
                        <FilterSection>
                            <FilterTitle>Stock Status</FilterTitle>
                            <FilterOption>

                                <label htmlFor="in-stock">In Stock</label>
                                <Input variant='checkbox' type="checkbox" id="in-stock" />
                            </FilterOption>
                            <FilterOption>
                                <label htmlFor="out-of-stock">Out of Stock</label>
                                <Input variant='checkbox' type="checkbox" id="out-of-stock" />
                            </FilterOption>
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
                                {products.map((product: Product) => (
                                    <Product key={product.id} product={product} />
                                ))}
                            </ProductsGrid>
                        ) : (
                            <NoProductsMessage>
                                No products available, please check back later
                            </NoProductsMessage>
                        )}
                    </ProductsSection>
                </Content>
            </MainContainer>
            <Footer />
        </>
    );
};

const FiltersContainer = styled.div`
    color: black;
    text-align: left;
    margin: 2rem;
    border-bottom: 1px solid #E5DEF9;

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
    margin-bottom: 0.5rem;
    color: black;
`;

const FilterOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

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
    font-size: 16px;
    font-weight: 400;
    line-height: 24.26px;
    letter-spacing: 0.02em;
    text-align: left;
    border-bottom: 1px solid #E5DEF9;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: white;
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
