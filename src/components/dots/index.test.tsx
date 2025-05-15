// Dots.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { Dots } from '.';

describe('Dots component', () => {
    it('renders review dots when `reviews` is true', () => {
        render(
            <Dots reviews totalPages={3} currentIndex={0} reviewsPerPage={1} />,
        );
        const dots = screen.getAllByTestId('dot');
        expect(dots).toHaveLength(3);
    });

    it('calls handleDotClick when a review dot is clicked', () => {
        const handleClick = jest.fn();
        render(
            <Dots
                reviews
                totalPages={2}
                currentIndex={0}
                handleDotClick={handleClick}
            />,
        );
        const dots = screen.getAllByTestId('dot');
        fireEvent.click(dots[1]);
        expect(handleClick).toHaveBeenCalledWith(1);
    });

    it('renders carousel dots when `carousel` is true', () => {
        render(<Dots carousel items={[{}, {}, {}, {}]} currentIndex={1} />);
        const dots = screen.getAllByTestId('dot');
        expect(dots).toHaveLength(4);
    });

    it('calls handleDotClick when a carousel dot is clicked', () => {
        const handleClick = jest.fn();
        render(
            <Dots
                carousel
                items={[1, 2]}
                currentIndex={0}
                handleDotClick={handleClick}
            />,
        );
        const dots = screen.getAllByTestId('dot');
        fireEvent.click(dots[1]);
        expect(handleClick).toHaveBeenCalledWith(1);
    });
});
