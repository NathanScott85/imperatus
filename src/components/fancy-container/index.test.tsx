import React from 'react';
import { render } from '@testing-library/react';
import { FancyContainer } from '.';
import 'jest-styled-components';

const renderComponent = (props = {}) =>
    render(
        <FancyContainer size="small" {...props}>
            <p>Test content</p>
        </FancyContainer>,
    );

describe('FancyContainer', () => {
    it('renders child content', () => {
        const { getByText } = renderComponent();
        expect(getByText('Test content')).toBeInTheDocument();
    });

    it('applies modal positioning when variant is modal', () => {
        const { container } = renderComponent({
            variant: 'modal',
            size: 'modal',
        });
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveStyleRule('position', 'fixed');
        expect(containerDiv).toHaveStyleRule('top', '50%');
        expect(containerDiv).toHaveStyleRule('left', '50%');
        expect(containerDiv).toHaveStyleRule(
            'transform',
            'translate(-50%, -50%)',
        );
    });

    it('applies correct background and border radius for filters', () => {
        const { container } = renderComponent({
            variant: 'filters',
            size: 'filters',
        });
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveStyleRule('border-radius', '0px');
        expect(containerDiv).not.toHaveStyleRule('background');
    });

    it('applies correct width and height for stock size', () => {
        const { container } = renderComponent({
            variant: 'stock',
            size: 'stock',
        });
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveStyleRule('width', '200px');
        expect(containerDiv).toHaveStyleRule('height', '100px');
    });

    it('uses default styles when no variant is provided', () => {
        const { container } = renderComponent({ size: 'small' });
        const containerDiv = container.firstChild;
        expect(containerDiv).toHaveStyleRule('position', 'relative');
        expect(containerDiv).toHaveStyleRule(
            'background',
            'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)',
        );
    });
});
