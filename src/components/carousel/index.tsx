import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import { ChevronLeft } from '../svg/chevron-left';
import { ChevronRight } from '../svg/chevron-right';
import { Dots } from '../../components/dots';

interface CarouselItem {
    id: number;
    img: string;
    name: string;
    price: number;
    rrp: number;
    category: string;
    game: string;
    description: string;
    buttontext: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1,
        );
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <CarouselContainer>
            {items.map((item, index) => (
                <CarouselSlide key={item.id} index={index - currentIndex}>
                    <> {console.log(item, 'item')}</>

                    <CarouselContentContainer>
                        <CarouselImage src={item.img} alt={item.name} />
                        <CarouselContentWrapper>
                            <GameImage src={item.game} />
                            <CarouselContent>
                                <p>{item.description}</p>
                                <Button
                                    link
                                    pathname={`/shop/card-games/${item.name}`}
                                    label={item?.buttontext}
                                    size="small"
                                    variant="secondary"
                                />
                            </CarouselContent>
                        </CarouselContentWrapper>
                    </CarouselContentContainer>
                </CarouselSlide>
            ))}
            <ArrowContainer>
                <StyledChevronLeft onClick={prevSlide} />
                <Dots
                    variant="carousel"
                    carousel
                    items={items}
                    currentIndex={currentIndex}
                    handleDotClick={handleDotClick}
                />
                <StyledChevronRight stroke="#ac8fff" onClick={nextSlide} />
            </ArrowContainer>
        </CarouselContainer>
    );
};

const GameImage = styled.img`
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    height: 550px;
    overflow: hidden;
    background: #130a30;
`;

const CarouselSlide = styled.div<{ index: number }>`
    position: absolute;
    left: ${({ index }) => index * 100}%;
    top: 0;
    transition: left 0.5s ease-in-out;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const CarouselContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const CarouselImage = styled.img`
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
`;

const CarouselContentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 260px;
    height: 298px;
    margin: 2rem;
    display: flex;
    align-items: center;
`;

const CarouselContent = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    p {
        font-size: 40px;
        font-weight: 800;
        padding: 0.5rem;
        color: #d4b05f;
        filter: drop-shadow(-2px -3px 2px #4444dd); /* Bottom-right shadow */
        font-size: 4em;
    }
`;

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    right: 50%;
`;

const StyledChevronLeft = styled(ChevronLeft)`
    width: 35px;
    height: 35px;
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-right: 10px;
`;

const StyledChevronRight = styled(ChevronRight)`
    width: 35px;
    height: 35px;
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-left: 10px;
`;

export default Carousel;
