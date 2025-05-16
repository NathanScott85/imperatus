// PercentageIncrease.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PercentageIncrease } from '.';

describe('PercentageIncrease', () => {
    it('renders upward arrow and correct percentage for positive increase', () => {
        render(<PercentageIncrease percentageIncrease={25.5} />);
        expect(screen.getByTestId('arrow-up-small')).toBeInTheDocument();
        expect(screen.getByText('25.50%')).toBeInTheDocument();
    });

    it('renders downward arrow and correct percentage for negative increase', () => {
        render(<PercentageIncrease percentageIncrease={-10.25} />);
        expect(screen.getByTestId('arrow-down-small')).toBeInTheDocument();
        expect(screen.getByText('-10.25%')).toBeInTheDocument();
    });

    it('renders downward arrow for 0% change', () => {
        render(<PercentageIncrease percentageIncrease={0} />);
        expect(screen.getByTestId('arrow-down-small')).toBeInTheDocument();
        expect(screen.getByText('0.00%')).toBeInTheDocument();
    });

    it('does not crash when percentage is null', () => {
        render(<PercentageIncrease percentageIncrease={null} />);
        expect(screen.getByTestId('arrow-down-small')).toBeInTheDocument();
        expect(screen.getByText('0.00%')).toBeInTheDocument();
    });
});
