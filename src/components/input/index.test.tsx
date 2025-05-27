// src/components/input/index.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';

describe('Input Component', () => {
    it('renders standard text input', () => {
        render(
            <Input placeholder="Enter name" variant="primary" type="text" />,
        );
        expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
        render(
            <Input
                placeholder="Password"
                type="password"
                showToggle
                variant="primary"
            />,
        );
        const toggleBtn = screen.getByRole('button');
        const input = screen.getByPlaceholderText(
            'Password',
        ) as HTMLInputElement;

        expect(input.type).toBe('password');
        fireEvent.click(toggleBtn);
        expect(input.type).toBe('text');
        fireEvent.click(toggleBtn);
        expect(input.type).toBe('password');
    });

    it('renders description textarea', () => {
        render(<Input placeholder="Enter details" variant="description" />);
        expect(
            screen.getByPlaceholderText('Enter details'),
        ).toBeInTheDocument();
    });

    it('renders file upload input', () => {
        const mockClick = jest.fn();
        render(<Input variant="upload" onClick={mockClick} />);
        const button = screen.getByText('Upload Image');
        fireEvent.click(button);
        expect(mockClick).toHaveBeenCalled();
    });

    it('renders radio input', () => {
        render(<Input type="radio" radio={true} name="choice" value="1" />);
        const input = screen.getByDisplayValue('1') as HTMLInputElement;
        expect(input.type).toBe('radio');
    });
});
