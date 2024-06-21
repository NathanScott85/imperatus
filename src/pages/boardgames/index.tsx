import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Container, MainContainer } from '../../components/styled';
import HomeIMG from '../../components/svg/website-images/0_10.png';
import { BreadCrumb } from '../../components/breadcrumbs';

export const BoardGames = () => {
    return (
    <>
          <TopHeader />
        <Header />
        <Navigation />
        <BreadCrumb label='Boardgames' />
        <Container>
            <Background />
        </Container>
        <MainContainer>
        </MainContainer>
        <Footer />
    </>
    );
};

const Background = styled('div')`
    background: #130A30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;

// const Container = styled('div')`
//     color: #10000E;
//     height: 625px;
//     width: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: -1;
//     background-image: linear-gradient(to bottom, black, #05030F);
// `;

// const ImageContainer = styled('div')`
//     background-image: url(${HomeIMG});
//     background-repeat: no-repeat;
//     background-size: cover;
//     height: 100%;
//     width: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     opacity: 0.5;
// `;
