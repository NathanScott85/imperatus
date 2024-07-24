import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';

// TODO: bring back categories from api
import { categories } from '../../../lib/category-mocks';
import { mediaQueries } from '../../../styled/breakpoints';

export const Category = () => {
    const { id } = useParams();

    const category = categories.find((category) => category.id === id);

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
            <Header background />
            <Navigation background />
            {category && (
                <ImageWrapper>
                    <p>{category.name}</p>
                </ImageWrapper>
            )}
            <CategoriesMain>
                <CategoriesContainer>
                    <CategoriesFilterContainer>
                        <Filters
                            filters
                            checkedStatus={checkedStatus}
                            handleChecked={handleChecked}
                        />
                    </CategoriesFilterContainer>
                    <CategoriesListContainer>
                        {category && <Products products={category?.products} />}
                    </CategoriesListContainer>
                </CategoriesContainer>
            </CategoriesMain>
            <Footer />
        </>
    );
};

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items; center;
    margin-bottom: 2.5rem;
`;

const CategoriesMain = styled.main`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: #c79d0a;
    padding: 2rem;
    margin: auto;
    width: 80%;
    padding: 1rem 0rem;
`;

const CategoriesFilterContainer = styled.div`
    h1 {
        color: black;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 650px);
    background-color: #130a30;
    p {
        color: #c79d0a;
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
    ${mediaQueries('sm')`
         height: calc(100vh - 1450px); 
    `};
    ${mediaQueries('md')`
        height: calc(100vh - 1250px);
    `};
    ${mediaQueries('lg')`
        height: calc(100vh - 1250px);
    `};
    ${mediaQueries('xl')`
           height: calc(100vh - 450px);
   `};
`;

const CategoriesListContainer = styled.div`
    display: flex;
    padding: 2rem;
`;
