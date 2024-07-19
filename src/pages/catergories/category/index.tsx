import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { MainContainer } from '../../../components/styled';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { categories } from '../../../lib/category-mocks';

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
                    <ImageContainer img={category.banner} />
                </ImageWrapper>
            )}
            <CategoriesMain>
                <Section>
                    <ProductFiltersContainer>
                        <Filters
                            filters
                            checkedStatus={checkedStatus}
                            handleChecked={handleChecked}
                        />
                    </ProductFiltersContainer>
                    {category && <Products products={category?.products} />}
                </Section>
            </CategoriesMain>
            <Footer />
        </>
    );
};

const Section = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 1.5rem;
`;

const CategoriesMain = styled(MainContainer)`
    flex-direction: row;
    background-color: white;
`;

const ProductFiltersContainer = styled.div`
    h1 {
        color: white;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
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
    height: calc(100vh - 450px);
    width: 100%;
    z-index: -1;
`;
