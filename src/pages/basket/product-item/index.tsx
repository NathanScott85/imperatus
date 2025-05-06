import React from 'react';
import styled from 'styled-components';
import { Delete } from '../../../components/svg';
import Button from '../../../components/button';
import { Input } from '../../../components/input';
import { useBasketContext } from '../../../context/basket';

interface Product {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    img?: {
        url: string;
    };
}

interface ProductItemProps {
    product: Product;
    variant?: boolean;
}

export const ProductItem: React.FC<ProductItemProps> = ({
    product,
    variant = false,
}) => {
    const { removeFromBasket, updateQuantity } = useBasketContext();

    const increase = () => {
        updateQuantity(product.productId, product.quantity + 1);
    };

    const decrease = () => {
        if (product.quantity > 1) {
            updateQuantity(product.productId, product.quantity - 1);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(e.target.value, 10);
        if (!isNaN(parsed) && parsed >= 1) {
            updateQuantity(product.productId, parsed);
        }
    };

    return (
        <BasketItemContainer>
            <img src={product.img?.url} alt={product.name || 'Product image'} />
            <BasketItem>
                <div>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                        £{(product.price * product.quantity).toFixed(2)}
                    </ProductPrice>
                </div>

                <QuantityWrapper>
                    <ButtonGroup>
                        <ArrowButton onClick={decrease}>−</ArrowButton>
                        <Input
                            type="text"
                            name={`quantity-${product.productId}`}
                            id={`quantity-${product.productId}`}
                            label="Quantity"
                            variant="secondary"
                            size="small"
                            value={product.quantity}
                            onChange={handleQuantityChange}
                        />
                        <ArrowButton onClick={increase}>+</ArrowButton>
                    </ButtonGroup>
                </QuantityWrapper>
            </BasketItem>
            <ProductBasketListButtons variant={variant}>
                <Button
                    variant="none"
                    onClick={() => removeFromBasket(product.productId)}
                    aria-label="Remove item"
                >
                    <Delete stroke="white" />
                </Button>
            </ProductBasketListButtons>
        </BasketItemContainer>
    );
};

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
`;

const QuantityWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    input {
        width: 50px;
        text-align: center;
        font-size: 1.2rem;
        background-color: #2a1f51;
        border: 2px solid #4d3c7b;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.75rem;
    }
    input:hover {
        background-color: #4d3c7b;
    }
`;

const ArrowButton = styled.button`
    background-color: #2a1f51;
    color: white;
    font-weight: 600;
    padding: 0.5rem 0.9rem;
    margin: 0 0.2rem;
    font-size: 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid #4d3c7b;
    &:hover {
        background-color: #4d3c7b;
        border: 2px solid #c79d0a;
    }
`;

const BasketItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    color: white;
    padding: 1rem;
    margin: 15px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    min-height: 120px;
    img {
        width: 75px;
        height: auto;
        border-radius: 8px;
    }

    &:hover {
        color: #c79d0a;
        border: 1px solid #c79d0a;
    }
`;

const BasketItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    margin-left: 10px;
    text-align: left;

    p {
        font-size: 16px;
        font-weight: 400;
        margin: 5px;
    }
`;

const ProductName = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: white;
`;

const ProductPrice = styled.p`
    font-size: 14px;
    font-weight: 400;
    margin: 4px 0 0 0;
    color: #c79d0a;
`;

const ProductBasketListButtons = styled.div<{ variant: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button {
        padding: ${(props) => (props.variant ? '2px' : '5px')};
    }
`;
