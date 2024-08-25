import React from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';

export interface CategoryDetailProps {
    category: any;
    onBack: () => void;
}

export const Category: React.FC<CategoryDetailProps> = ({
    category,
    onBack,
}) => {
    return (
        <CategoryMain>
            <BackButton onClick={onBack}>Back to Categories</BackButton>
            <CategoryContainer>
                <CategoryDetailsWrapper>
                    <strong>Category Name</strong>
                    <CategoryDetails>{category.name}</CategoryDetails>
                    <strong>Description</strong>
                    <CategoryDetails>{category.description}</CategoryDetails>
                </CategoryDetailsWrapper>
            </CategoryContainer>
        </CategoryMain>
    );
};

const CategoryMain = styled.div`
    color: white;
    width: 100%;
`;

const CategoryContainer = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const CategoryDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 0.5rem;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
    }
`;

const CategoryDetails = styled.p`
    font-family: Barlow;
    font-size: 14px;
    color: white;
    padding-bottom: 0.5rem;
`;

const BackButton = styled.button`
    background-color: #4d3c7b;
    color: #fff;
    border: none;
    margin-bottom: 1.5rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    padding: 0.75rem;
    &:hover {
        background-color: #2a1f51;
    }
`;
