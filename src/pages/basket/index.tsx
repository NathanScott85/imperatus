import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Container, MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';

export const Basket = () => (
    <>
        <TopHeader />
        <Header />
        <Container>
            <Background />
        </Container>
        <Navigation />
        <BreadCrumb label="Basket" />
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