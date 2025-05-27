import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Basket } from '.';
import { BasketItem } from '../../context/basket';
import { BasketContext } from '../../context/basket';
import { MemoryRouter } from 'react-router-dom';

const mockBasketItem: BasketItem = {
    productId: 1,
    name: 'Test Product',
    price: 10.5,
    quantity: 2,
    img: { url: 'http://image.com/test.jpg' },
};

const renderComponent = (overrides = {}) => {
    const defaultContext = {
        basket: [mockBasketItem],
        addToBasket: jest.fn(),
        removeFromBasket: jest.fn(),
        updateQuantity: jest.fn(),
        clearBasket: jest.fn(),
        discountCode: '',
        setDiscountCode: jest.fn(),
        discountValue: 0,
        setDiscountValue: jest.fn(),
        discountApplied: false,
        setDiscountApplied: jest.fn(),
        appliedCode: null,
        setAppliedCode: jest.fn(),
    };

    return render(
        <MemoryRouter>
            <BasketContext.Provider value={{ ...defaultContext, ...overrides }}>
                <Basket />
            </BasketContext.Provider>
        </MemoryRouter>,
    );
};

describe('Basket Component', () => {
    it('renders the basket icon and item count', () => {
        renderComponent();
        expect(screen.getByText('Basket')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // quantity
    });

    it('opens the dropdown on click', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Basket'));
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('clears basket when Clear Basket is clicked', () => {
        const clearBasket = jest.fn();
        renderComponent({ clearBasket });

        fireEvent.click(screen.getByText('Basket'));
        fireEvent.click(screen.getByText('Clear Basket'));
        expect(clearBasket).toHaveBeenCalled();
    });

    it('calls increase quantity function', () => {
        const updateQuantity = jest.fn();
        renderComponent({ updateQuantity });

        fireEvent.click(screen.getByText('Basket'));
        fireEvent.click(screen.getByText('+'));
        expect(updateQuantity).toHaveBeenCalledWith(1, 3);
    });

    it('calls decrease quantity function', () => {
        const updateQuantity = jest.fn();
        renderComponent({ updateQuantity });

        fireEvent.click(screen.getByText('Basket'));
        fireEvent.click(screen.getByText('−'));
        expect(updateQuantity).toHaveBeenCalledWith(1, 1);
    });

    it('removes item when ✕ is clicked', () => {
        const removeFromBasket = jest.fn();
        renderComponent({ removeFromBasket });

        fireEvent.click(screen.getByText('Basket'));
        fireEvent.click(screen.getByTestId('remove-item'));
        expect(removeFromBasket).toHaveBeenCalledWith(1);
    });

    it('shows undo after removal', () => {
        renderComponent();

        fireEvent.click(screen.getByText('Basket'));
        fireEvent.click(screen.getByTestId('remove-item'));
        expect(screen.getByText('Undo')).toBeInTheDocument();
    });
});
