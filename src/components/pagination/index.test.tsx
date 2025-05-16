import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination component', () => {
    const setup = (
        currentPage: number,
        totalPages: number,
        onPageChange = jest.fn(),
    ) => {
        render(
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />,
        );
        return onPageChange;
    };

    it('does not render when totalPages is 1 or less', () => {
        const { container } = render(
            <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={jest.fn()}
            />,
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders page numbers correctly when totalPages is less than or equal to 5', () => {
        setup(2, 5);
        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(i)).toBeInTheDocument();
        }
    });

    it('calls onPageChange when clicking a page number', () => {
        const onPageChange = setup(2, 5);
        fireEvent.click(screen.getByText('4'));
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('disables previous button on first page', () => {
        setup(1, 10);
        expect(screen.getByLabelText('First page')).toBeDisabled();
        expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });

    it('disables next button on last page', () => {
        setup(10, 10);
        expect(screen.getByLabelText('Next page')).toBeDisabled();
        expect(screen.getByLabelText('Last page')).toBeDisabled();
    });

    it('renders ellipsis and navigation buttons when totalPages > 5', () => {
        setup(5, 10);
        expect(screen.getAllByText('...').length).toBeGreaterThan(0);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('clicking ellipsis near start jumps back', () => {
        const onPageChange = setup(5, 10);
        fireEvent.click(screen.getAllByText('...')[0]);
        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('clicking ellipsis near end jumps forward', () => {
        const onPageChange = setup(5, 10);
        fireEvent.click(screen.getAllByText('...')[1]);
        expect(onPageChange).toHaveBeenCalledWith(10);
    });
});
