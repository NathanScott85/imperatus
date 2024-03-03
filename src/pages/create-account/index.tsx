import React from "react";
import styled from '@emotion/styled';
import { Header, TopHeader } from "../../components/header";
import { Navigation } from "../../components/navigation";
import { BreadCrumb } from "../../components/breadcrumbs";
import { MainContainer, Container } from "../../components/styled";
import { Footer } from "../../components/footer";

export const CreateAccount = () => (
    <>
        <TopHeader />
        <Header />
        <Navigation />
        <Container>
            <Background />
        </Container>
        <BreadCrumb label="Create Account" />
        <MainContainer />
        <Footer />
    </>
);

const Background = styled('div')`
    background: #130A30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

