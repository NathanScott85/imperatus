import React from 'react';
import { render, screen } from '@testing-library/react';
import { GrowthRate } from '.';

const renderComponent = (props = {}) =>
    render(
        <GrowthRate
            currentMonth={120}
            lastMonth={100}
            previousMonth={90}
            {...props}
        />,
    );

describe('GrowthRate', () => {
    it('renders the growth rate title and comparison text', () => {
        renderComponent();
        expect(screen.getByText('Growth Rate')).toBeInTheDocument();
        expect(screen.getByText('Compared to last month:')).toBeInTheDocument();
        expect(screen.getByTestId('percentage-increase')).toBeInTheDocument();
        expect(screen.getByText(/vs previous 30 days/i)).toBeInTheDocument();
    });

    it('displays positive percentage difference with correct styling', () => {
        renderComponent({
            currentMonth: 120,
            lastMonth: 100,
            previousMonth: 90,
        });
        const difference = ((120 - 100) / 100 - (100 - 90) / 90) * 100; // ~5.56%
        expect(
            screen.getByText(`${difference.toFixed(2)}%`),
        ).toBeInTheDocument();
        expect(screen.getByTestId('percentage-increase')).toHaveTextContent(
            '20.00%',
        );
    });

    it('displays negative percentage difference with correct styling', () => {
        renderComponent({
            currentMonth: 80,
            lastMonth: 100,
            previousMonth: 90,
        });
        const difference = ((80 - 100) / 100 - (100 - 90) / 90) * 100;
        expect(
            screen.getByText(`${difference.toFixed(2)}%`),
        ).toBeInTheDocument();
        expect(screen.getByTestId('percentage-increase')).toHaveTextContent(
            '-20.00%',
        );
    });

    it('does not render when lastMonth is 0', () => {
        renderComponent({ currentMonth: 80, lastMonth: 0, previousMonth: 90 });
        expect(
            screen.queryByText('Compared to last month:'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('percentage-increase'),
        ).not.toBeInTheDocument();
    });
});
