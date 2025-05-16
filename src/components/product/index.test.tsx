import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Product } from './index';
import { useProductsContext } from '../../context/products';
import { useBasketContext } from '../../context/basket';

jest.mock('../../context/products');
jest.mock('../../context/basket');

const mockProduct = {
    id: 1,
    name: 'Test Product',
    category: {
        id: 2,
        name: 'Category Name',
        description: 'Category Description',
        slug: 'category-slug',
    },
    price: 10.5,
    rrp: 15.0,
    img: { url: '/image.jpg' },
    preorder: true,
    slug: 'test-product',
    type: 'physical', // Added type property
    stock: {
        quantity: 100,
        status: 'in-stock',
        amount: 100,
        instock: 'true',
        soldout: 'false',
        preorder: 'true',
    }, // Updated stock property to match Stock type
    set: false, // Added set property
};

describe('Product Component', () => {
    const setProduct = jest.fn();
    const fetchProductById = jest.fn();
    const addToBasket = jest.fn();
    const removeFromBasket = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useProductsContext as jest.Mock).mockReturnValue({
            product: null,
            setProduct,
            loading: false,
            fetchProductById,
        });
        (useBasketContext as jest.Mock).mockReturnValue({
            basket: [],
            addToBasket,
            removeFromBasket,
        });
    });

    it('renders loading if no product is available and loading is true', () => {
        (useProductsContext as jest.Mock).mockReturnValueOnce({
            product: null,
            setProduct,
            loading: true,
            fetchProductById,
        });

        render(
            <MemoryRouter>
                <Product />
            </MemoryRouter>,
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders with provided productProp', () => {
        render(
            <MemoryRouter>
                <Product product={mockProduct} />
            </MemoryRouter>,
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Pre-Order')).toBeInTheDocument();
        expect(screen.getByText('Add to cart')).toBeInTheDocument();
    });

    it('calls addToBasket when clicking Add to cart', () => {
        render(
            <MemoryRouter>
                <Product product={mockProduct} />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByText('Add to cart'));
        expect(addToBasket).toHaveBeenCalledWith({
            productId: mockProduct.id,
            name: mockProduct.name,
            price: mockProduct.price,
            quantity: 1,
            img: mockProduct.img,
        });
    });

    it('shows Added to cart if item is already in basket', () => {
        (useBasketContext as jest.Mock).mockReturnValueOnce({
            basket: [{ productId: 1 }],
            addToBasket,
            removeFromBasket,
        });

        render(
            <MemoryRouter>
                <Product product={mockProduct} />
            </MemoryRouter>,
        );

        expect(screen.getByText('Added to cart')).toBeInTheDocument();
    });
});
