import React from 'react';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { MainContainer } from '../../components/styled';

export const NewsAndEvents = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="News And Events" />
        <MainContainer></MainContainer>
        <Footer />
    </>
);
