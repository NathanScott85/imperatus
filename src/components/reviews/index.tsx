import React, { useState } from 'react';
import styled from 'styled-components';
import { Review } from '../review';
import { mediaQueries } from '../../styled/breakpoints';
import { reviews } from '../../lib/mocks';

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="#ac8fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (
    props,
) => (
    <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9 18L15 12L9 6"
            stroke="#ac8fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface ReviewsProps {
    label?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({
    label = 'Customer Reviews',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviewsPerPage = 2; // Number of reviews per page
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

    return (
        <Section>
            <ReviewsWrapper>
                <ArrowContainer>
                    {totalReviews !== 0 ? (
                        <>
                            <StyledChevronLeft onClick={prevReview} />
                            <Dots>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <Dot
                                            key={index}
                                            active={
                                                Math.floor(
                                                    currentIndex /
                                                        reviewsPerPage,
                                                ) === index
                                            }
                                        />
                                    ),
                                )}
                            </Dots>
                            <StyledChevronRight onClick={nextReview} />
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
    `};

    ${mediaQueries('xl')`
        position: absolute;
        top: 75%;
        left: 43px;
        transform: translateY(-50%);
        flex-direction: column;
    `};
`;

const Dots = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dot = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? '#ac8fff' : 'transparent')};
    border: 1px solid #ac8fff;
    ${mediaQueries('xl')`
        display: none;
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

const StyledChevronRight = styled(ChevronRight)`
    width: 35px;
    height: 35px;
    border: 2px solid #ac8fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    ${mediaQueries('sm')`
        margin-right: 7px;
    `};
`;

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
    ${mediaQueries('sm')`
        padding: 5rem;
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
