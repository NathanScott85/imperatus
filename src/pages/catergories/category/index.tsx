import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import styled from '@emotion/styled';
import  Pokemon  from '../../../components/svg/page-headers/Pokemon.png'
import { MainContainer } from '../../../components/styled';

interface CategoryProps {
    name: string;
    id: number;
}

export const Category = ({ name }: CategoryProps) => (
        <>
            <Container>
                <Top />
                <ImageContainer />
            </Container>
            <TopHeader />
            <Header />
            <Navigation />
            <MainContainer>
            <section>
                <h1>{name}</h1>
            </section>
            </MainContainer> 
        </>
);

const Container = styled('div')`
    color: #10000E;
    height: 625px;
    width: 100%;
    position: absolute;
    top: 100;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(to bottom, black, #05030F);
`;

const Top = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(0deg, #130A30, #130A30),
    linear-gradient(0deg, #4D3C7B, #4D3C7B);
    padding: 1rem;
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

`;
const ImageContainer = styled('div')`
    background-image: url(${Pokemon});
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    position: relative;
    top: 200;
    left: 0;
    margin-top: 13.5rem;
`;
