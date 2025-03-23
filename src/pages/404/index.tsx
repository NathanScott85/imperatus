import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { FancyContainer } from '../../components/fancy-container';
import { Footer } from '../../components/footer';
import { HomeIcon } from '../../components/svg/home';
import { MainContainer } from '../../components/styled';
import { BreadCrumb } from '../../components/breadcrumbs';
import Reviews from '../../components/reviews';

export const FourOFour = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb
                label='404 Error, Page not found'
            />
            <MainContainer>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <h1>404 Error, Page Not Found</h1>
                            <p>The page you are looking for does not exist.</p>
                            <Link to="/" aria-label="Go to Home Page">
                                <HomeIcon aria-hidden="true" />
                            </Link>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>

                {/* <Reviews /> */}
                <p>Replace with Latest Products</p>
            </MainContainer>
            <Footer />
        </>
    );
};

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 1.5rem;
    margin: 1.5rem;
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
