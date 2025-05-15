import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';

describe('Modal Component', () => {
    const baseProps = {
        title: 'Delete Account',
        content: 'Are you sure you want to delete your account?',
        handleCloseModal: jest.fn(),
    };

    it('renders modal title and content', () => {
        render(<Modal {...baseProps} />);
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
        expect(
            screen.getByText('Are you sure you want to delete your account?'),
        ).toBeInTheDocument();
    });

    it('displays error message when provided', () => {
        render(<Modal {...baseProps} errorMessage="Something went wrong" />);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('displays success message when provided', () => {
        render(<Modal {...baseProps} successMessage="Account deleted" />);
        expect(screen.getByText('Account deleted')).toBeInTheDocument();
    });

    it('shows input field when label is provided and not in preview mode', () => {
        render(
            <Modal
                {...baseProps}
                label="Type DELETE to confirm"
                confirmationText=""
                setConfirmationText={jest.fn()}
            />,
        );
        expect(
            screen.getByLabelText('Type DELETE to confirm'),
        ).toBeInTheDocument();
    });

    it('calls handleDeleteAccount when confirm button is clicked', () => {
        const onDelete = jest.fn();
        render(
            <Modal
                {...baseProps}
                handleDeleteAccount={onDelete}
                label="Type DELETE to confirm"
                confirmationText="DELETE"
                setConfirmationText={jest.fn()}
            />,
        );
        fireEvent.click(screen.getByText('Confirm'));
        expect(onDelete).toHaveBeenCalled();
    });

    it('calls handleCloseModal when cancel button is clicked', () => {
        render(<Modal {...baseProps} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(baseProps.handleCloseModal).toHaveBeenCalled();
    });

    it('renders only Close button in preview mode', () => {
        render(<Modal {...baseProps} preview />);
        expect(screen.getByText('Close')).toBeInTheDocument();
        expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/Type/)).not.toBeInTheDocument();
    });
});
