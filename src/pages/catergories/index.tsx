import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';

// TODO: bring back categories from api

const catergories = [
    {
        id: 1,
        name: 'pokemon',
        img: 'https://images.pokemontcg.io/ex14/1.png'

    },
    {
        id: 2,
        name: 'yugioh',
        src: 'https://images.pokemontcg.io/ex14/1.png'
    }
]


export const Categories = () => (
        <>
            <Container>
                <Background />
            </Container>
            <TopHeader />
            <Header />
            <Navigation />
            <BreadCrumb label='Categories' />
            <MainContainer>
                <h1>Categories</h1>
                {catergories.map((catergory: any) => (
                    <div key={catergory.id}>
                        <Link to={`/shop/categories/category/${catergory.id}`}>
                            <h2>{catergory.name}</h2>
                            <img src={catergory.img} alt={catergory.name} />
                        </Link>
                    </div>
                ))
                }
            </MainContainer>
            <Footer />
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

const Background = styled('div')`
    background: #130A30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
