import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { accessories } from '../../../lib/accessories-mocks';

export const Accessory = () => {
    const { id } = useParams();

    const accessory = accessories.find((accessories) => accessories.id === id);
    console.log(accessory, 'accessory');
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
            {accessory && (
                <ImageWrapper>
                    <p>{accessory.name}</p>
                </ImageWrapper>
            )}
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
                        {accessory && (
                            <Products products={accessory?.products} />
                        )}
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

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #130a30;
    p {
        color: #d4b05f;
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
`;
