import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Checkbox } from '.';

describe('Checkbox', () => {
    const defaultProps = {
        id: 'test-checkbox',
        type: 'checkbox',
        checked: false,
        onChange: jest.fn(),
    };

    const renderComponent = (props = {}) =>
        render(<Checkbox {...defaultProps} {...props} />);

    it('renders unchecked by default', () => {
        renderComponent();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders checked when passed', () => {
        renderComponent({ checked: true });
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls onChange when clicked', () => {
        const onChange = jest.fn();
        renderComponent({ onChange });
        const visualBox = screen.getByRole('checkbox')
            .nextSibling as HTMLElement;
        fireEvent.click(visualBox);
        expect(onChange).toHaveBeenCalled();
    });

    it('has correct styles when checked', () => {
        renderComponent({ checked: true });
        const visualBox = screen.getByRole('checkbox')
            .nextSibling as HTMLElement;
        expect(visualBox).toHaveStyleRule('background', '#ac8fff');
    });

    it('has correct styles when unchecked', () => {
        renderComponent({ checked: false });
        const visualBox = screen.getByRole('checkbox')
            .nextSibling as HTMLElement;
        expect(visualBox).toHaveStyleRule('background', 'white');
    });
});
