import React, { useState } from "react";
import styled from "styled-components";
import { Review } from "../review";

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface ReviewProps {
    name: string;
    rating: number;
    review: string;
}

const reviews: ReviewProps[] = [
    { name: "John Doe", rating: 4, review: "Great product, highly recommend! I've been using this for a few weeks now, and it has exceeded my expectations in every way. The build quality is solid, and it performs exactly as described. I would definitely purchase this again." },
    { name: "Jane Smith", rating: 5, review: "Excellent quality and fast shipping. The customer service was outstanding, and the product arrived well-packaged and on time. It's rare to find such high quality at this price point. Highly recommended!" },
    { name: "Samuel Green", rating: 3, review: "Good, but could be better. The product works as advertised, but I encountered a few minor issues. The instructions were a bit unclear, and it took some time to set up properly. Overall, a decent purchase for the price." },
    { name: "Michael Brown", rating: 4, review: "Satisfied with the purchase. This product met most of my expectations, and I appreciate the thoughtful design. There were a few small flaws, but nothing that affected its overall performance. Worth the money." },
    { name: "Emily White", rating: 5, review: "Amazing! Exceeded my expectations. From the moment I opened the box, I knew I had made a good choice. The attention to detail and quality of materials are evident. I've recommended this to all my friends." },
    { name: "Jessica Johnson", rating: 2, review: "Not what I expected. Unfortunately, this product did not meet my needs. It was difficult to use and didn't perform as I had hoped. The return process was straightforward, though, and the customer service was helpful." },
    { name: "David Wilson", rating: 4, review: "Good value for money. This is a solid product for the price. It performs well and is made of quality materials. There are a few areas for improvement, but overall, I'm happy with my purchase." },
    { name: "Chris Lee", rating: 3, review: "Average product. This item is okay for occasional use, but I wouldn't rely on it for heavy-duty tasks. The performance is adequate, but it lacks some features that would make it truly outstanding." },
    { name: "Sarah Taylor", rating: 5, review: "Fantastic! Will buy again. This is one of the best products I've ever bought. It's well-designed, easy to use, and performs flawlessly. I've already placed an order for another one as a gift." },
    { name: "Daniel Moore", rating: 4, review: "Very good quality. I am impressed with the quality of this product. It has been reliable and durable, even with frequent use. The only downside is the slightly higher price, but it's worth it for what you get." },
];

interface ReviewsProps {
    label?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ label = "Customer Reviews" }) => {
    const [currentindex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <Section>
            <ReviewsWrapper>
              <ArrowContainer>
                    <StyledChevronLeft onClick={prevReview} />
                    <StyledChevronRight onClick={nextReview} />
                </ArrowContainer>
                <ReviewsHeader>{label}</ReviewsHeader>
                <ReviewContainer>
                    {reviews.length !== 0 ? (
                        reviews.slice(currentindex, currentindex + 4).map((review, index) => (
                            <Review key={index} {...review} />
                        ))
                    ) : (
                        <NoReviewsMessage>No reviews available, consider leaving a review?</NoReviewsMessage>
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
    flex-direction: column;
    align-items: center;
    position: absolute;
    border: 2px solid red;
`;

const StyledChevronLeft = styled(ChevronLeft)`
    width: 35px;
    height: 35px;
    border: 2px solid black;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
    margin-bottom: 10px;
`;

const StyledChevronRight = styled(ChevronRight)`
    width: 35px;
    height: 35px;
    border: 2px solid black;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    background-color: white;
`;

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;  
    padding: 2rem;
`;

const ReviewsHeader = styled.h1`
    font-family: Cinzel;
    font-size: 30px;
    font-weight: 700;
    line-height: 57px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #130A30;
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
`;

export default Reviews;
