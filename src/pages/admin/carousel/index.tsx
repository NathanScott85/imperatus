import styled from 'styled-components';
import Carousel from '../../../components/carousel';
import { sampleItems } from '../../../lib/carousel-mocks';

export const AdminCarousel = () => {
    return (
        <CarouselContainer>
            <CarouselTitle>Carousel</CarouselTitle>
            <div>
                <p>You can preview changes to the carousel here</p>
            </div>
            <div>
                <Carousel small items={sampleItems} />
            </div>
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const CarouselTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;