import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusTag from './index';

const statusTests = [
    { status: 'pending', color: 'rgb(243, 156, 18)', text: 'Pending' },
    { status: 'processing', color: 'rgb(52, 152, 219)', text: 'Processing' },
    { status: 'shipped', color: 'rgb(46, 204, 113)', text: 'Shipped' },
    { status: 'cancelled', color: 'rgb(231, 76, 60)', text: 'Cancelled' },
    { status: 'refunded', color: 'rgb(155, 89, 182)', text: 'Refunded' },
    { status: 'unknown', color: 'rgb(204, 204, 204)', text: 'Unknown' },
];

describe('StatusTag component', () => {
    statusTests.forEach(({ status, color, text }) => {
        it(`renders with correct text and color for status "${status}"`, () => {
            render(<StatusTag status={status} />);
            const tag = screen.getByText(text);
            expect(tag).toBeInTheDocument();
            const computed = getComputedStyle(tag);
            expect(computed.color).toBe(color);
        });
    });
});
