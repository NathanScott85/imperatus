import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { cardgames } from '../../../lib/card-games';
import { mediaQueries } from '../../../styled/breakpoints';

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
            {cardgame && <ImageContainer img={cardgame.banner} />}
            <CardGameMain>
                <CardGameContainer>
                    <FiltersContainer>
                        <Filters
                            filters
                            checkedStatus={checkedStatus}
                            handleChecked={handleChecked}
                        />
                    </FiltersContainer>
                    <CardGameListContainer>
                        {cardgame && <Products products={cardgame?.products} />}
                    </CardGameListContainer>
                </CardGameContainer>
            </CardGameMain>
            <Footer />
        </>
    );
};

const CardGameListContainer = styled.div`
    display: flex;
    gap: 1rem;
    padding: 2rem;
`;

const CardGameContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items; center;
    margin-bottom: 2.5rem;
`;

const CardGameMain = styled.main`
    flex-direction: row;
    background-color: white;
    justify-content: center;
    align-items; center;
    margin-bottom: 2.5rem;
`;

const FiltersContainer = styled.div`
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

const ImageContainer = styled.div<{ img?: any }>`
    background-image: url(${(props) => props.img});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
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
           height: calc(100vh - 500px);
   `};
`;
