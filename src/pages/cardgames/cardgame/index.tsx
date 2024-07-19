import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { MainContainer } from '../../../components/styled';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { cardgames } from '../../../lib/card-games';

export const CardGame = () => {
    const { id } = useParams();

    const cardgame = cardgames.find((cardgame) => cardgame.id === id);

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
            {cardgame && (
                <ImageWrapper>
                    <ImageContainer img={cardgame.banner} />
                </ImageWrapper>
            )}
            <CardGameMain>
                <Section>
                    <ProductFiltersContainer>
                        <Filters
                            filters
                            checkedStatus={checkedStatus}
                            handleChecked={handleChecked}
                        />
                    </ProductFiltersContainer>
                    {cardgame && <Products products={cardgame?.products} />}
                </Section>
            </CardGameMain>
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

const CardGameMain = styled(MainContainer)`
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
