import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderList } from './index';

const mockOrders = [
    {
        month: 'April',
        total: 20,
        products: [
            {
                id: 1,
                category: { name: 'Games' },
                game: 'Test',
                name: 'Prod A',
                img: '',
                price: 10,
                type: 'card',
                rrp: 15,
                stock: { amount: 5, sold: 5, instock: '', soldout: '' },
            },
            {
                id: 2,
                category: { name: 'Games' },
                game: 'Test',
                name: 'Prod B',
                img: '',
                price: 15,
                type: 'card',
                rrp: 20,
                stock: { amount: 3, sold: 2, instock: '', soldout: '' },
            },
        ],
    },
    {
        month: 'May',
        total: 25,
        products: [
            {
                id: 3,
                category: { name: 'Games' },
                game: 'Test',
                name: 'Prod C',
                img: '',
                price: 20,
                type: 'card',
                rrp: 25,
                stock: { amount: 10, sold: 5, instock: '', soldout: '' },
            },
            {
                id: 4,
                category: { name: 'Games' },
                game: 'Test',
                name: 'Prod D',
                img: '',
                price: 10,
                type: 'card',
                rrp: 15,
                stock: { amount: 7, sold: 4, instock: '', soldout: '' },
            },
        ],
    },
];

describe('OrderList component', () => {
    it('renders the correct order for the current month', () => {
        render(<OrderList orders={mockOrders} currentMonth="May" />);
        expect(screen.getByText(/Orders for May/i)).toBeInTheDocument();
        expect(
            screen.getByText((text) => text.includes('Total value:')),
        ).toBeInTheDocument();
        expect(
            screen.getByText((text) => text.includes('$30.00')),
        ).toBeInTheDocument();
    });

    it('does not render orders from other months', () => {
        render(<OrderList orders={mockOrders} currentMonth="May" />);
        expect(screen.queryByText(/Orders for April/i)).not.toBeInTheDocument();
    });

    it('shows the difference when previous order is provided', () => {
        render(<OrderList orders={mockOrders} currentMonth="May" />);
        expect(screen.getByText('Difference: 5')).toBeInTheDocument();
        expect(
            screen.getByText((text) => text.includes('Previous months total:')),
        ).toBeInTheDocument();
        expect(
            screen.getByText((text) => text.includes('$25.00')),
        ).toBeInTheDocument();
    });
});
