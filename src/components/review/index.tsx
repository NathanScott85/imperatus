import React from 'react';
import styled from 'styled-components';

export const Review = ({ name, rating, review }: any) => {
    return (
        <ReviewContainer>
            <ReviewerName>{name}</ReviewerName>
            <StarRating>
                {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
            </StarRating>
            <ReviewText>{review}</ReviewText>
        </ReviewContainer>
    );
};

const ReviewContainer = styled.div`
    border: 1px solid #ac8fff;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    padding: 2rem;
    &:hover {
        border: 1px solid #d4b05f;
    }
    min-height: 300px;
`;

const ReviewerName = styled.span`
    font-family: Cinzel;
    font-size: 16px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0.02em;
    text-align: left;
    display: block;
    margin-bottom: 5px;
`;

const StarRating = styled.div`
    font-family: Cinzel;
    font-size: 2rem;
    line-height: 12px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #d4b05f;
    margin: 15px;
    margin-left: -2px;
`;

const ReviewText = styled.p`
    font-family: Cinzel;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.02em;
    text-align: left;
    color: black;
    word-wrap: break-word;
    width: 200px;
`;
