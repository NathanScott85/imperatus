import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Container, MainContainer } from '../../components/styled';
import { BreadCrumb } from '../../components/breadcrumbs';

export const BoardGames = () => {
    return (
        <>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label="Boardgames" />
            <Container>
                <Background />
            </Container>
            <MainContainer></MainContainer>
            <Footer />
        </>
    );
};

const Background = styled('div')`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;
