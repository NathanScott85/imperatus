import styled from 'styled-components';

export const AddCarousel = () => {
    return (
        <CarouselContainer>
            <CarouselTitle>Add Carousel Page</CarouselTitle>
        </CarouselContainer>
    );
};

export const Container = styled.div`
    color: #10000e;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const CarouselContainer = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    background-color: #160d35;
    color: white;
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
