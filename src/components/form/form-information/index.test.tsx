import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormInformation } from '.';
import { MemoryRouter } from 'react-router-dom';

const renderComponent = (props = {}) =>
    render(
        <MemoryRouter>
            <FormInformation {...props} />
        </MemoryRouter>,
    );

describe('FormInformation', () => {
    it('renders register section correctly', () => {
        renderComponent({ register: true });

        expect(screen.getByText('Already a customer?')).toBeInTheDocument();
        expect(
            screen.getByText(
                "Create an account with us and you'll be able to:",
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Check out faster')).toBeInTheDocument();
        expect(
            screen.getByText('Save your shipping addresses'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Access your order history'),
        ).toBeInTheDocument();
        expect(screen.getByText('Track new orders')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute(
            'href',
            '/account/login',
        );
    });

    it('renders login section correctly', () => {
        renderComponent({ login: true });

        expect(screen.getByText('New Customer?')).toBeInTheDocument();
        expect(
            screen.getByText(
                "Create an account with us and you'll be able to:",
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Check out faster')).toBeInTheDocument();
        expect(
            screen.getByText('Save your shipping address'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Access your order history'),
        ).toBeInTheDocument();
        expect(screen.getByText('Track new orders')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Create Account' }),
        ).toHaveAttribute('href', '/account/register');
    });

    it('renders nothing if no props are passed', () => {
        const { container } = renderComponent();
        expect(container).toBeEmptyDOMElement();
    });
});
