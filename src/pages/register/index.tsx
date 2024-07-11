import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer, Container } from '../../components/styled';
import { FancyContainer } from '../../components/fancy-container';

export const Register = () => {
    return (
        <>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label="Register" />
            <Container>
                <Background />
            </Container>
            <MainContainer>
                <FancyContainer>
                   <SyledParagraph>Here</SyledParagraph> 
                </FancyContainer>
            </MainContainer>

            <Footer />
        </>
    );
};

const SyledParagraph = styled.p` color: red;

`;
const Background = styled('div')`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;

export default Register;
