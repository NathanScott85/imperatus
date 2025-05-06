import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasketIcon } from '../svg';
import { useBasketContext } from '../../context/basket';
import { useNavigate } from 'react-router-dom';
import Button from '../button';

export const Basket = () => {
    const { basket, removeFromBasket } = useBasketContext();
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <BasketWrapper ref={ref}>
            <BasketContainer onClick={() => setOpen((prev) => !prev)}>
                {totalItems > 0 ? (
                    <BasketIcon type="full" />
                ) : (
                    <BasketIcon type="Bag" />
                )}
                <span>Basket</span>
                <Divider />
                <span>{totalItems}</span>
            </BasketContainer>
            {open && (
                <Dropdown>
                    <CloseSpan onClick={() => setOpen(false)}>✕</CloseSpan>
                    {basket.length === 0 ? (
                        <EmptyMessage>Your basket is empty.</EmptyMessage>
                    ) : (
                        <>
                            <PreviewList>
                                {basket.slice(0, 5).map((item) => (
                                    <PreviewItem key={item.productId}>
                                        <img
                                            src={item.img?.url}
                                            alt={item.name}
                                        />
                                        <div>
                                            <p>{item.name}</p>
                                            <small>
                                                <strong>Qty:</strong>{' '}
                                                {item.quantity}
                                            </small>
                                            <Price>
                                                £
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </Price>
                                        </div>
                                        <Remove
                                            onClick={() =>
                                                removeFromBasket(item.productId)
                                            }
                                        >
                                            ✕
                                        </Remove>
                                    </PreviewItem>
                                ))}
                                {basket.length > 5 && (
                                    <MoreItems>
                                        + {basket.length - 5} more
                                    </MoreItems>
                                )}
                            </PreviewList>
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={() => navigate('/shop/basket')}
                            >
                                View Basket
                            </Button>
                        </>
                    )}
                </Dropdown>
            )}
        </BasketWrapper>
    );
};

const Remove = styled.span`
    margin-left: auto;
    font-size: 1.4rem;
    color: white;
    cursor: pointer;
    padding: 1rem;
    align-self: auto;
    &:hover {
        color: #c79d0a;
    }
`;

const Price = styled.p`
    font-size: 12px;
    color: #ffffff;
    margin: 0.25rem 0 0 0;
`;

const EmptyMessage = styled.p`
    color: white;
    font-size: 14px;
    text-align: center;
    margin: auto 0;
`;

const CloseSpan = styled.span`
    position: absolute;
    top: -15px;
    right: -5px;
    font-size: 1.8rem;
    color: white;
    cursor: pointer;
    margin: 0.75rem;
    padding: 0.5rem;
    &:hover {
        color: #c79d0a;
    }
`;

const PreviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-top: 0.75rem;
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #2a1f51;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ac8fff;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #c79d0a;
    }
`;

const PreviewItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid white;
    background-color: #130a30;
    border: 2px solid #4d3c7b;
    border-radius: 3px;
    img {
        width: 75px;
        height: auto;
        border-radius: 4px;
        margin: 0.75rem;
    }
    p {
        font-size: 1.4rem;
        color: white;
    }
    small {
        font-size: 1.4rem;
        color: white;

        strong {
            font-weight: bold;
            font-size: 1.4rem;
            color: #c79d0a; /* your brand color */
        }
    }
`;

const MoreItems = styled.p`
    font-size: 1.2rem;
    color: white;
    text-align: right;
    padding-bottom: 0.5rem;
    margin: 0;
`;

const BasketWrapper = styled.div`
    position: relative;
`;

const BasketContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    gap: 0.5rem;
`;

const Divider = styled.span`
    height: 1rem;
    width: 1px;
    background-color: #ffffff;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 160%;
    right: -35px;
    background: #1b133d;
    border: 1px solid #4d3c7b;
    padding: 2.5rem 1rem 1.5rem 1rem;
    border-radius: 6px;
    z-index: 100;
    min-width: 350px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    button {
        margin-top: 1rem;
        border: none;
        padding: 0.5rem;
        width: 100%;
        cursor: pointer;
        color: white;
        font-weight: bold;
    }
`;
