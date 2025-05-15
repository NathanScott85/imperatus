import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { Products } from '.';
import { ProductsProvider } from '../../context/products';
import { BasketProvider } from '../../context/basket';

const wrapper = (ui: React.ReactElement) => (
    <MockedProvider>
        <ProductsProvider>
            <BasketProvider>
                <MemoryRouter>{ui}</MemoryRouter>
            </BasketProvider>
        </ProductsProvider>
    </MockedProvider>
);

const mockProducts = [
    {
        id: 1,
        name: 'Test Product',
        price: 9.99,
        rrp: 14.99,
        category: { id: 1, slug: 'test' },
        img: { url: 'https://example.com/image.jpg' },
        preorder: false,
        slug: 'test-product',
        stock: { amount: 10, sold: 0, instock: 'yes', soldout: 'no' },
        type: 'standard',
        set: null,
    },
];

describe('Products component', () => {
    it('renders latest products section with products', () => {
        render(
            wrapper(
                <Products products={mockProducts} label="Latest Products" />,
            ),
        );
        expect(screen.getByText('Latest Products')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders product recommendations section with products', () => {
        render(
            wrapper(
                <Products
                    products={mockProducts}
                    label="Product Recommendations"
                />,
            ),
        );
        expect(screen.getByText('Product Recommendations')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders fallback message when no products with label', () => {
        render(wrapper(<Products products={[]} label="Latest Products" />));
        expect(screen.getByText(/No products available/i)).toBeInTheDocument();
    });

    it('renders fallback message when no label and no products', () => {
        render(wrapper(<Products products={[]} />));
        expect(screen.getByText(/No products available/i)).toBeInTheDocument();
    });

    it('renders grid when label is not provided and products exist', () => {
        render(wrapper(<Products products={mockProducts} />));
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
});
