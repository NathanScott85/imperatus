import React from 'react';
import styled, { css } from 'styled-components';

interface DotsProps {
    children?: React.ReactNode;
    totalPages?: number | undefined;
    currentIndex?: number;
    reviewsPerPage?: number | undefined;
    handleDotClick?: (index: number) => void;
    reviews?: boolean;
    items?: any[];
    carousel?: boolean;
    variant?: any;
    active?: any;
}

export const Dots: React.FC<DotsProps> = ({
    totalPages,
    variant,
    currentIndex = 0,
    reviewsPerPage = 1,
    handleDotClick,
    reviews = false,
    items,
    carousel = false,
}) => {
    return (
        <>
            {reviews && (
                <DotsContainer>
                    {totalPages
                        ? Array.from({ length: totalPages }, (_, index) => (
                              <StyledDot
                                  variant={variant}
                                  key={index}
                                  active={
                                      Math.floor(
                                          (currentIndex /
                                              reviewsPerPage) as number,
                                      ) === index
                                  }
                                  onClick={() => handleDotClick?.(index)}
                              />
                          ))
                        : null}
                </DotsContainer>
            )}
            {carousel && (
                <DotsContainer>
                    {items?.map((item, index) => (
                        <StyledDot
                            variant={variant}
                            key={index}
                            active={index === currentIndex}
                            onClick={() => handleDotClick?.(index)}
                        />
                    ))}
                </DotsContainer>
            )}
        </>
    );
};

interface StyledDotProps {
    active: boolean | any;
    variant?: string | any;
}

export const StyledDot = styled.div<StyledDotProps>`
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? '#ac8fff' : 'transparent')};
    border: 1px solid #ac8fff;
    transition: all 0.3s ease-in-out;
    ${(props) =>
        props.active &&
        css`
            transform: scale(1.8);
        `}

    ${({ variant, active }) =>
        variant === 'carousel' &&
        css`
            width: 10px;
            height: 10px;
            margin: 0 5px;
            border-radius: 50%;
            background-color: ${active ? '#130A30' : 'transparent'};
            border: 1px solid #ac8fff;
            transition: all 0.3s ease-in-out;
        `}

        ${({ variant, active }) =>
        variant === 'reviews' &&
        css`
            width: 10px;
            height: 10px;
            margin: 0 5px;
            border-radius: 50%;
            background-color: ${active ? '#130A30' : 'transparent'};
            border: 1px solid #ac8fff;
            transition: all 0.3s ease-in-out;
        `}
`;

export const DotsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
