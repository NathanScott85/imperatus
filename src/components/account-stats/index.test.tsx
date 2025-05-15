import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccountStats } from '.';

const renderComponent = (props = { currentMonth: 120, lastMonth: 100 }) =>
    render(<AccountStats {...props} />);

describe('AccountStats', () => {
    it('renders account stats with increase and percentage', () => {
        renderComponent();

        expect(screen.getByText('Account Statistics')).toBeInTheDocument();
        expect(screen.getByText('Accounts created')).toBeInTheDocument();
        expect(screen.getByText('120')).toBeInTheDocument();
        expect(screen.getByText('Compared to last month:')).toBeInTheDocument();
        expect(screen.getByText('Increase: +20')).toBeInTheDocument();
        expect(screen.getByTestId('percentage-increase')).toHaveTextContent(
            '20.00%',
        );
    });

    it('renders account stats with decrease and percentage', () => {
        renderComponent({ currentMonth: 80, lastMonth: 100 });

        expect(screen.getByText('Decrease: -20')).toBeInTheDocument();
        expect(screen.getByTestId('percentage-increase')).toHaveTextContent(
            '-20.00%',
        );
    });

    it('does not show comparison if lastMonth is 0', () => {
        renderComponent({ currentMonth: 50, lastMonth: 0 });

        expect(
            screen.queryByText('Compared to last month:'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('percentage-increase'),
        ).not.toBeInTheDocument();
    });
});
