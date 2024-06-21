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
        <Navigation />
        <BreadCrumb label='Accessories' />
        <Container>
            <Background />
        </Container>
        <MainContainer>
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

// const Section = styled.section`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: white;
//     width: 100%;
//     height: 100%;
//     padding: 2rem 0;
//     color: black;
//     font-size: 1.5rem;
// `;