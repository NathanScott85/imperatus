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
        <MainContainer >
            <Section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestias, odio dolore non facilis odit, officia accusamus eius sapiente deserunt nulla explicabo asperiores sunt eum omnis fuga ea dolores ipsam.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, incidunt blanditiis cum voluptate ex maxime eos magnam itaque id vero maiores quisquam, est consequatur, laborum nihil quam. Quasi, dicta unde! 
            </Section>
        </MainContainer>
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
    z-index: -2;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    color: black;
    font-size: 1.5rem;
`;