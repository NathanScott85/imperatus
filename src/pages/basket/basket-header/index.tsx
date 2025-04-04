import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';

interface BasketHeaderProps {
    title: string;
    hasProducts: boolean;
    onMoveAllClick: () => void;
    moveAllLabel: string;
}

export const BasketHeader: React.FC<BasketHeaderProps> = ({
    title,
    hasProducts,
    onMoveAllClick,
    moveAllLabel,
}) => {
    return (
        <HeaderContainer>
            <h2>{title}</h2>
            {hasProducts && (
                <Button
                    variant="none"
                    size="small"
                    label={moveAllLabel}
                    onClick={onMoveAllClick}
                />
            )}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    h2 {
        font-family: Cinzel;
        font-size: 18px;
        font-weight: bold;
        line-height: 29.66px;
        color: white;
        padding: 1rem 1rem 1rem 0rem;
    }
`;
