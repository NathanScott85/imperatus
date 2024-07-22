import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';

// TODO: bring back categories from api
import { preorders as orders } from '../../../lib/preorder-mocks';
import { mediaQueries } from '../../../styled/breakpoints';

export const Orders = () => {
    const { id } = useParams();

    const preorders = orders.find((order) => order.id === id);

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
            {preorders && (
                <ImageWrapper>
                <ImageContainer img={preorders.banner} />
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
                        {preorders && <Products products={preorders?.products} />}
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
    color: #d4b05f;
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
`;

const ImageContainer = styled.div<{ img?: any }>`
    background-image: url(${(props) => props.img});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    z-index: -1;
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
           height: calc(100vh - 300px);
   `};
`;

const CategoriesListContainer = styled.div`
    display: flex;
    padding: 2rem;
`;
