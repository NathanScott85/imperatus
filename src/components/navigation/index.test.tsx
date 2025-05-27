import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './index';

describe('Navigation Component', () => {
    it('renders all visible nav items', () => {
        render(
            <MemoryRouter initialEntries={['/shop/categories']}>
                <Navigation />
            </MemoryRouter>,
        );

        expect(screen.getByText('Categories')).toBeInTheDocument();
        expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    });

    it('applies active class to the current path', () => {
        render(
            <MemoryRouter initialEntries={['/shop/categories']}>
                <Navigation />
            </MemoryRouter>,
        );

        const activeLink = screen.getByText('Categories');
        expect(activeLink).toHaveClass('active');
    });

    it('does not apply active class to non-current paths', () => {
        render(
            <MemoryRouter initialEntries={['/shop/categories']}>
                <Navigation />
            </MemoryRouter>,
        );

        const inactiveLink = screen.getByText('Coming Soon');
        expect(inactiveLink).not.toHaveClass('active');
    });
});
