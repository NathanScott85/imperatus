import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Review } from '../review';
import { mediaQueries } from '../../styled/breakpoints';
import { reviews } from '../../lib/mocks';
import { Dots } from '../../components/dots';
import { ChevronRight } from '../svg/chevron-right';
import { ChevronLeft } from '../svg/chevron-left';

interface ReviewsProps {
    label?: string;
    variant?: any;
}

export const Reviews: React.FC<ReviewsProps> = ({
    label = 'Customer Reviews',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviewsPerPage = 3;
    const totalReviews = reviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    const nextReview = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex + reviewsPerPage) % totalReviews,
        );
    };

    const prevReview = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - reviewsPerPage + totalReviews) % totalReviews,
        );
    };

    const visibleReviews = reviews.slice(
        currentIndex,
        currentIndex + reviewsPerPage,
    );

    const handleDotClick = (index: number) => {
        setCurrentIndex(index * reviewsPerPage);
    };

    return (
        <Section>
            <ReviewsWrapper>
                <ArrowContainer>
                    {totalReviews !== 0 ? (
                        <>
                            <StyledChevronLeft onClick={prevReview} />
                            <Dots
                                variant="reviews"
                                reviews
                                totalPages={totalPages}
                                currentIndex={currentIndex}
                                reviewsPerPage={reviewsPerPage}
                                handleDotClick={handleDotClick}
                            />
                            <StyledChevronRight
                                stroke="#ac8fff"
                                variant="reviews"
                                onClick={nextReview}
                            />
                        </>
                    ) : null}
                </ArrowContainer>
                <ReviewsHeader>{label}</ReviewsHeader>
                <ReviewContainer>
                    {visibleReviews.length !== 0 ? (
                        visibleReviews.map((review, index) => (
                            <Review key={index} {...review} />
                        ))
                    ) : (
                        <NoReviewsMessage>
                            No reviews available, consider leaving a review?
                        </NoReviewsMessage>
                    )}
                </ReviewContainer>
            </ReviewsWrapper>
        </Section>
    );
};

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 1.5rem;
`;

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 55%;
    left: 5px;
    transform: translateY(-50%);

    ${mediaQueries('sm')`
        position: absolute;
        bottom: -175px;
        left: 50%;
        transform: translateX(-50%);
        flex-direction: row;
        padding-bottom: 1.5rem;
    `};
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

const StyledChevronRight = styled(ChevronRight)<ReviewsProps>`
    width: 35px;
    height: 35px;
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-left: 10px;
    ${mediaQueries('sm')`
        margin-right: 10px;
    `};
    ${({ variant }) =>
        variant === 'carousel' &&
        css`
            margin: 0 5px;
            border-radius: 50%;
            background-color: #130a30;
            border: 1px solid #ac8fff;
            transition: all 0.3s ease-in-out;
            width: 35px;
            height: 35px;
            border: 2px solid #ac8fff;
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            margin-left: 10px;
        `}

    ${({ variant }) =>
        variant === 'reviews' &&
        css`
            margin: 0 5px;
            border-radius: 50%;
            background-color: white;
            border: 1px solid #ac8fff;
            transition: all 0.3s ease-in-out;
            width: 35px;
            height: 35px;
            border: 2px solid #ac8fff;
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            margin-left: 10px;
        `}
`;

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
    ${mediaQueries('sm')`
        padding: 3rem 0 3.5rem 0;
        margin-bottom: 2rem;
    `};
`;

const ReviewsHeader = styled.h1`
    font-family: Cinzel;
    font-size: 30px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #130a30;
`;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    transition: transform 0.3s ease-in-out;
    justify-content: center;
    overflow: hidden;
`;

const NoReviewsMessage = styled.div`
    font-size: 18px;
    color: #777;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    padding: 3rem;
`;

export default Reviews;
