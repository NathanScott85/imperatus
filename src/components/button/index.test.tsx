import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Button } from '.';
import { MemoryRouter } from 'react-router-dom';

describe('Button component', () => {
    it('renders with label', () => {
        render(<Button label="Click Me" />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('fires onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} />);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a link when variant is "text"', () => {
        render(
            <MemoryRouter>
                <Button label="Link Button" variant="text" pathname="/about" />
            </MemoryRouter>,
        );
        const link = screen.getByText('Link Button');
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', '/about');
    });

    it('does not fire onClick when disabled', () => {
        const handleClick = jest.fn();
        render(<Button label="Disabled" onClick={handleClick} disabled />);
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies width for size "small"', () => {
        render(<Button label="Small" size="small" />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyleRule('width', '150px');
    });

    it('applies primary background color', () => {
        render(<Button label="Primary" variant="primary" />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyleRule('background-color', '#D4B05F');
    });

    it('applies secondary background color', () => {
        render(<Button label="Secondary" variant="secondary" />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyleRule('background-color', '#AC8FFF');
    });

    it('has underline for text variant', () => {
        render(
            <MemoryRouter>
                <Button label="Text" variant="text" pathname="/somewhere" />
            </MemoryRouter>,
        );
        const link = screen.getByText('Text');
        expect(link).toHaveStyleRule('text-decoration', 'underline');
        expect(link).toHaveStyleRule('font-family', 'Barlow');
    });

    it('applies disabled styles', () => {
        render(<Button label="Disabled" variant="primary" disabled />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyleRule('opacity', '0.6');
        expect(btn).toHaveStyleRule('color', '#A9A9A9');
    });
    it('renders children inside the button', () => {
        render(
            <Button>
                <span data-testid="child">Inner</span>
            </Button>,
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
    it('renders with type submit', () => {
        render(<Button label="Submit" type="submit" />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveAttribute('type', 'submit');
    });
    it('renders link correctly with variant "none"', () => {
        render(
            <MemoryRouter>
                <Button label="No Style" variant="none" link pathname="/test" />
            </MemoryRouter>,
        );
        const link = screen.getByText('No Style');
        expect(link).toHaveAttribute('href', '/test');
        expect(link.tagName).toBe('A');
    });
    it('renders link as disabled', () => {
        render(
            <MemoryRouter>
                <Button
                    label="Disabled Link"
                    variant="text"
                    pathname="/blocked"
                    disabled
                />
            </MemoryRouter>,
        );
        const link = screen.getByText('Disabled Link');
        expect(link).toHaveStyleRule('pointer-events', 'none');
    });
    it('renders link when link=true and variant is "secondary"', () => {
        render(
            <MemoryRouter>
                <Button
                    label="Linked Secondary"
                    variant="secondary"
                    link
                    pathname="/some-link"
                />
            </MemoryRouter>,
        );
        const link = screen.getByText('Linked Secondary');
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', '/some-link');
    });
    it('renders with default styles when no props are passed', () => {
        render(<Button label="Default" />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyleRule('background-color', '#C79D0A');
        expect(btn).toHaveStyleRule('font-weight', '700'); // ← updated
        expect(btn).toHaveStyleRule('width', 'auto');
    });
});
