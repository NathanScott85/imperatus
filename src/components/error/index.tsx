import React from 'react';
import styled from 'styled-components';
import { MainContainer } from '../styled';
import { Header, TopHeader } from '../header';
import { BreadCrumb } from '../breadcrumbs';
import { Navigation } from '../navigation';
import { FancyContainer } from '../fancy-container';
import Reviews from '../reviews';
import { Footer } from '../footer';
import { HomeIcon } from '../svg/home';
import { Link } from 'react-router-dom';

export const Error = ({error}: any) => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            {error && <BreadCrumb label="Categories" />}
            <ImageWrapper>
            <p>Error, A Problem Occurred</p>
            </ImageWrapper>
            <ErrorMain>
                <FancyContainer variant="login" size="login">
                    <FancyContainerSubWrapper>
                        <h1>Error, A Problem Occurred</h1>
                        <p>Error please reload the page.</p>
                        <Link to="/" aria-label="Go to Home Page">
                            <HomeIcon aria-hidden="true" />
                        </Link>
                    </FancyContainerSubWrapper>
                </FancyContainer>
                <Reviews />
            </ErrorMain>
            <Footer />
        </>

    );
};

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
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
`;

const ErrorMain = styled(MainContainer)`
    flex-direction: column;
`;

const ErrorMessage = styled.span`
    color: red;
    font-family: Cinzel;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;

    p {
        margin: 0.5rem;
        font-family: 'Barlow', sans-serif;
        font-size: 16px;
    }

    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    z-index: 50;
`;