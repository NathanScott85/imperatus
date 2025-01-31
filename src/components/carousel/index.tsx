import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import { ChevronLeft } from '../svg/chevron-left';
import { ChevronRight } from '../svg/chevron-right';
import { Dots } from '../../components/dots';

interface CarouselPage {
    id: string;
    title: string;
    description: string;
    img?: any;
    brand: any;
    disabled?: boolean
}

interface CarouselProps {
    items: {
        id: string;
        title: string;
        pages: CarouselPage[];
    }[];
    small?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({ items, small = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const enabledPages = items.flatMap((item) => item.pages).filter((page) => !page.disabled);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === enabledPages.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? enabledPages.length - 1 : prevIndex - 1,
        );
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Container>
            <CarouselContainer small={small}>
                {enabledPages.map((page, index) => (
                    <CarouselSlide key={page.id} index={index - currentIndex}>
                        <CarouselContentContainer>
                            {page.img && (
                                <CarouselImage
                                    src={page.img.url}
                                    alt={page.title}
                                    small={small}
                                />
                            )}
                            <CarouselContentWrapper small={small}>
                                {page.brand ? (
                                    <BrandThumbnail src={page.brand.img.url} />
                                ) : null}

                                <CarouselContent small={small}>
                                    <p>{page.title}</p>
                                    <p>{page.description}</p>
                                    <Button
                                        link
                                        pathname={`/shop/card-games/${page.id}`}
                                        label="Learn More"
                                        size="small"
                                        variant="secondary"
                                    />
                                </CarouselContent>
                            </CarouselContentWrapper>
                        </CarouselContentContainer>
                    </CarouselSlide>
                ))}

                <ArrowContainer>
                    <StyledChevronLeft onClick={prevSlide} small={small} />
                    <Dots
                        variant="carousel"
                        carousel
                        items={enabledPages}
                        currentIndex={currentIndex}
                        handleDotClick={handleDotClick}
                    />
                    <StyledChevronRight
                        stroke="#ac8fff"
                        onClick={nextSlide}
                        small={small}
                    />
                </ArrowContainer>
            </CarouselContainer>
        </Container>
    );
};

const BrandThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;


const Container = styled.div`
    color: #10000e;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CarouselContainer = styled.div<{ small: boolean }>`
    position: relative;
    width: ${({ small }) => (small ? '50%' : '100%')};
    height: ${({ small }) => (small ? '300px' : '550px')};
    overflow: hidden;
    background: #130a30;
    border-radius: ${({ small }) => (small ? '5px' : '0px')};
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

const CarouselImage = styled.img<{ small: boolean }>`
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    height: ${({ small }) => (small ? '100%' : 'auto')};
`;

const CarouselContentWrapper = styled.div<{ small: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ small }) => (small ? '180px' : '260px')};
    height: ${({ small }) => (small ? '200px' : '298px')};
    margin: ${({ small }) => (small ? '1rem' : '2rem')};
    display: flex;
    align-items: center;
`;

const CarouselContent = styled.div<{ small: boolean }>`
    font-family: Barlow, sans-serif;
    font-size: ${({ small }) => (small ? '10px' : '14px')};
    font-weight: 600;
    line-height: ${({ small }) => (small ? '30px' : '50px')};
    p {
        font-size: ${({ small }) => (small ? '20px' : '40px')};
        font-weight: 800;
        padding: 0.5rem;
        color: #c79d0a;
        filter: drop-shadow(-2px -3px 2px #4444dd);
    }
`;

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    right: 45%;
`;

const StyledChevronLeft = styled(ChevronLeft) <{ small: boolean }>`
    width: ${({ small }) => (small ? '25px' : '35px')};
    height: ${({ small }) => (small ? '25px' : '35px')};
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-right: 10px;
`;

const StyledChevronRight = styled(ChevronRight) <{ small: boolean }>`
    width: ${({ small }) => (small ? '25px' : '35px')};
    height: ${({ small }) => (small ? '25px' : '35px')};
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-left: 10px;
`;

export default Carousel;
