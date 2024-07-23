import React from 'react';
import styled from 'styled-components';
import { Delete } from '../../../components/svg';
import Button from '../../../components/button';

interface ProductItemProps {
    product: any;
    onRemove: (id: number) => void;
    onMove: () => void;
    moveLabel: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
    product,
    onRemove,
    onMove,
    moveLabel,
}) => {
    return (
        <ItemContainer>
            <img src={product.img} alt={product.name} />
            <ProductInfo>
                <div>
                    <p>{product.name}</p>
                    <p>£{product.price}</p>
                    <Button size="small" variant="none" onClick={onMove}>
                        {moveLabel}
                    </Button>
                </div>
                <StyledInput type="number" defaultValue={1} min={1} />
            </ProductInfo>
            <ProductBasketListButtons>
                <Button variant="none" onClick={() => onRemove(product.id)}>
                    <Delete stroke="white" />
                </Button>
            </ProductBasketListButtons>
        </ItemContainer>
    );
};

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    color: white;
    padding: 1rem;
    margin: 15px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    img {
        width: 75px;
        height: auto;
        border-radius: 8px;
    }
    &:hover {
        color: #d4b05f;
        border: 1px solid #d4b05f;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
        font-size: 16px;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
        font-weight: 400;
        margin: 5px;
    }
    justify-content: space-between;
    margin-left: 10px;
    text-align: left;
    flex: 1;
`;

const ProductBasketListButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: right;
`;

const StyledInput = styled.input`
    width: 30px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #4d3c7b;
    border-radius: 4px;
    background-color: white;
    color: black;
    margin-right: 10px;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
        border: 2px solid #d4b05f;
    }
    &[type='number'] {
        -moz-appearance: textfield;
    }
`;
