import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasketIcon } from '../svg';
import { BasketItem, useBasketContext } from '../../context/basket';
import { useNavigate } from 'react-router-dom';
import Button from '../button';

type RemovedBasketItem = BasketItem & { index: number };

export const Basket = () => {
    const {
        basket,
        removeFromBasket,
        updateQuantity,
        addToBasket,
        clearBasket,
    } = useBasketContext();
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    const [open, setOpen] = useState(false);
    const [removedItem, setRemovedItem] = useState<RemovedBasketItem | null>(
        null,
    );
    const undoTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    const increaseQty = (id: number, current: number) => {
        updateQuantity(id, current + 1);
    };

    const decreaseQty = (id: number, current: number) => {
        if (current > 1) updateQuantity(id, current - 1);
    };

    const handleRemove = (item: BasketItem, index: number) => {
        setRemovedItem({ ...item, index });
        removeFromBasket(item.productId);
        if (undoTimeout.current) clearTimeout(undoTimeout.current);
        undoTimeout.current = setTimeout(() => setRemovedItem(null), 10000);
    };

    const handleUndo = () => {
        if (removedItem) {
            addToBasket(removedItem);
            setRemovedItem(null);
            if (undoTimeout.current) clearTimeout(undoTimeout.current);
        }
    };

    const renderItems = () => {
        const maxItems = 5;
        const items = basket.slice(0, maxItems);
        const listLength = Math.min(
            maxItems,
            basket.length + (removedItem ? 1 : 0),
        );

        return Array.from({ length: listLength }).map((_, i) => {
            if (removedItem && removedItem.index === i) {
                return (
                    <UndoBar>
                        <div>
                            <RemovedLabel>Removed</RemovedLabel>
                            <p>{removedItem.name}</p>
                            <Quantity>Qty: {removedItem.quantity}</Quantity>
                        </div>
                        <UndoAction onClick={handleUndo}>Undo</UndoAction>
                    </UndoBar>
                );
            }

            const adjustedIndex =
                removedItem && removedItem.index <= i ? i - 1 : i;
            const item = items[adjustedIndex];
            if (!item) return null;

            return (
                <PreviewItem key={item.productId}>
                    <img src={item.img?.url} alt={item.name} />
                    <div>
                        <p>{item.name}</p>
                        <QuantityControls>
                            <strong>Qty:</strong>{' '}
                            <span
                                onClick={() =>
                                    decreaseQty(item.productId, item.quantity)
                                }
                            >
                                −
                            </span>
                            <strong>{item.quantity}</strong>
                            <span
                                onClick={() =>
                                    increaseQty(item.productId, item.quantity)
                                }
                            >
                                +
                            </span>
                        </QuantityControls>
                        <Price>
                            £{(item.price * item.quantity).toFixed(2)}
                        </Price>
                    </div>
                    <Remove onClick={() => handleRemove(item, i)}>✕</Remove>
                </PreviewItem>
            );
        });
    };

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
                    {basket.length === 0 && !removedItem ? (
                        <EmptyMessage>Your basket is empty.</EmptyMessage>
                    ) : (
                        <>
                            <PreviewList>{renderItems()}</PreviewList>
                            {basket.length > 5 && (
                                <MoreItems>
                                    + {basket.length - 5} more
                                </MoreItems>
                            )}

                            <TotalAmount>
                                <span
                                    onClick={() => {
                                        clearBasket();
                                        setRemovedItem(null);
                                        if (undoTimeout.current)
                                            clearTimeout(undoTimeout.current);
                                    }}
                                >
                                    Clear Basket
                                </span>
                                <span>
                                    Total: £
                                    {basket
                                        .reduce(
                                            (sum, item) =>
                                                sum +
                                                item.price * item.quantity,
                                            0,
                                        )
                                        .toFixed(2)}
                                </span>
                            </TotalAmount>
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
const QuantityControls = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.3rem;
    span {
        cursor: pointer;
        color: #c79d0a;
        font-weight: bold;
        font-size: 1.4rem;
        padding: 0 0.4rem;
        &:hover {
            color: white;
        }
    }
    strong {
        color: white;
        font-size: 1.2rem;
    }
`;

const TotalAmount = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    text-align: right;
    font-size: 1.2rem;
    font-weight: bold;
    padding-top: 1rem;
    margin-right: 0.75rem;

    span:first-child {
        color: #c79d0a;
        cursor: pointer;
        &:hover {
            color: white;
        }
    }

    span {
        color: #c79d0a;
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

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
    font-family: Cinzel, serif;
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
    border: 1px solid #4d3c7b;
    background-color: #130a30;
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
    &:hover {
        border-color: #c79d0a;
        background-color: #1f1442;
        transition:
            background-color 0.2s ease,
            border-color 0.2s ease;
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
    span {
        font-size: 12px;
    }
    span:last-child {
        width: 16px; // adjust to fit e.g. 2-digit numbers like '99'
        text-align: center;
    }
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

const UndoBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border: 2px dashed #4d3c7b;
    background-color: #130a30;
    border-radius: 3px;
    padding: 0.75rem;
    min-height: 85px;
    p {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

const RemovedLabel = styled.p`
    font-family: Cinzel, serif;
    font-size: 1.2rem;
    color: #c79d0a;
    font-weight: bold;
    margin: 0;
`;

const Quantity = styled.p`
    font-size: 1rem;
    color: #ccc;
    margin: 0.2rem 0 0 0;
`;

const UndoAction = styled.span`
    color: #c79d0a;
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
