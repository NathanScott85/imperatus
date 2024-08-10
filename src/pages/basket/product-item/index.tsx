import React from 'react';
import styled from 'styled-components';
import { Delete } from '../../../components/svg';
import Button from '../../../components/button';

interface ProductItemProps {
    product: any;
    onRemove: (id: number) => void;
    onMove?: () => void;
    moveLabel?: string;
    variant?: boolean;
}

export const ProductItem: React.FC<ProductItemProps> = ({
    product,
    onRemove,
    onMove,
    moveLabel,
    variant = false,
}) => {
    return (
        <ItemContainer variant={variant}>
            <img src={product.img} alt={product.name} />
            <ProductInfo variant={variant}>
                <div>
                    <p>{product.name}</p>
                    <p>£{product.price}</p>
                    <Button size="small" variant="none" onClick={onMove}>
                        {moveLabel}
                    </Button>
                </div>
                {!variant && (
                    <StyledInput type="number" defaultValue={1} min={1} />
                )}
            </ProductInfo>
            <ProductBasketListButtons variant={variant}>
                <Button variant="none" onClick={() => onRemove(product.id)}>
                    <Delete stroke="white" />
                </Button>
            </ProductBasketListButtons>
        </ItemContainer>
    );
};

const ItemContainer = styled.div<{ variant: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    color: white;
    padding: ${(props) => (props.variant ? '1.5rem' : '1rem')};
    margin: ${(props) => (props.variant ? '4px' : '15px')};

    border: ${(props) =>
        props.variant ? '1px solid #ac8fff;' : ' 1px solid #4d3c7b;'};
    border-radius: 8px;
    img {
        width: ${(props) => (props.variant ? '50px' : '75px')};
        height: auto;
        border-radius: 8px;
    }
    &:hover {
        color: #c79d0a;
        border: 1px solid #c79d0a;
    }
`;

const ProductInfo = styled.div<{ variant: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
        font-size: ${(props) => (props.variant ? '14px' : '16px')};
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
        font-weight: 400;
        margin: ${(props) => (props.variant ? '3px' : '5px')};
    }
    justify-content: space-between;
    margin-left: 10px;
    text-align: left;
    flex: 1;
`;

const ProductBasketListButtons = styled.div<{ variant: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: right;
    button {
        padding: ${(props) => (props.variant ? '2px' : '5px')};
    }
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
        border: 2px solid #c79d0a;
    }
    &[type='number'] {
        -moz-appearance: textfield;
    }
`;
