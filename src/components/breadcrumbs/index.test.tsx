import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '.';
import 'jest-styled-components';

const renderWithPath = (path: string) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="*" element={<BreadCrumb />} />
            </Routes>
        </MemoryRouter>,
    );
};

describe('BreadCrumb', () => {
    it('renders home link', () => {
        renderWithPath('/');
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders breadcrumb segments', () => {
        renderWithPath('/games/genesis-impact');
        expect(screen.getByText('Games')).toBeInTheDocument();
        expect(screen.getByText('Genesis Impact')).toBeInTheDocument();
    });

    it('skips segments that are numeric or excluded', () => {
        renderWithPath('/shop/123/category/abc');
        expect(screen.queryByText('Shop')).not.toBeInTheDocument();
        expect(screen.queryByText('123')).not.toBeInTheDocument();
        expect(screen.queryByText('Category')).not.toBeInTheDocument();
    });

    it('renders chevron icons between valid segments', () => {
        renderWithPath('/games/alpha');
        const chevrons = screen.getAllByTestId('chevron-right');
        expect(chevrons.length).toBeGreaterThan(0);
    });

    it('renders label when hidden is true', () => {
        render(
            <MemoryRouter>
                <BreadCrumb hidden label="My Label" />
            </MemoryRouter>,
        );
        expect(screen.getByText('My Label')).toBeInTheDocument();
    });

    it('renders extra text if provided', () => {
        render(
            <MemoryRouter>
                <BreadCrumb text="Details about this page" />
            </MemoryRouter>,
        );
        expect(screen.getByText('Details about this page')).toBeInTheDocument();
    });

    it('applies active styles to the last breadcrumb link', () => {
        renderWithPath('/category/my-page');
        const links = screen.getAllByRole('link');
        const last = links[links.length - 1];
        expect(last).toHaveStyleRule('font-weight', 'bold');
        expect(last).toHaveStyleRule('color', '#c79d0a');
    });
});
