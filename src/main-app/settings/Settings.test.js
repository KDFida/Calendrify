import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from './Settings';
import { getAuth, updatePassword, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    updatePassword: jest.fn(),
    deleteUser: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const setup = () => render(
    <BrowserRouter>
        <Settings />
    </BrowserRouter>
);

describe('Settings', () => {
    const newPassword = 'newPassword123!';
    let user;

    beforeEach(() => {
        jest.clearAllMocks();
        user = { email: 'test@example.com' };
        getAuth.mockReturnValue({ currentUser: user });
    });

    // Test Case 1: Renders the settings page correctly
    test('renders the settings page correctly', () => {
        setup();
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
        expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete Account/i)).toBeInTheDocument();
    });

    // Test Case 2: Successfully changes password
    test('successfully changes password', async () => {
        updatePassword.mockResolvedValue();

        setup();

        fireEvent.change(screen.getByPlaceholderText(/Enter new password/i), { target: { value: newPassword } });
        fireEvent.click(screen.getByText(/Update Password/i));

        await waitFor(() => {
            expect(updatePassword).toHaveBeenCalledWith(user, newPassword);
            expect(toast.success).toHaveBeenCalledWith("Password updated successfully");
        });
    });

    // Test Case 3: Handles password update failure
    test('handles password update failure', async () => {
        updatePassword.mockRejectedValue(new Error('Error updating password'));

        setup();

        fireEvent.change(screen.getByPlaceholderText(/Enter new password/i), { target: { value: newPassword } });
        fireEvent.click(screen.getByText(/Update Password/i));

        await waitFor(() => {
            expect(updatePassword).toHaveBeenCalledWith(user, newPassword);
            expect(toast.error).toHaveBeenCalledWith("Error updating password");
        });
    });

    // Test Case 4: Successfully deletes account
    test('successfully deletes account', async () => {
        deleteUser.mockResolvedValue(); 
        window.confirm = jest.fn().mockReturnValue(true); 

        setup();
        fireEvent.click(screen.getByText(/Delete My Account/i));

        await waitFor(() => {
            expect(deleteUser).toHaveBeenCalledWith(user);
            expect(toast.success).toHaveBeenCalledWith("Account deleted successfully");
        });
    });

    // Test Case 5: Handles account deletion failure
    test('handles account deletion failure', async () => {
        deleteUser.mockRejectedValue(new Error('Error deleting account'));
        window.confirm = jest.fn().mockReturnValue(true);

        setup();
        fireEvent.click(screen.getByText(/Delete My Account/i));

        await waitFor(() => {
            expect(deleteUser).toHaveBeenCalledWith(user);
            expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Error deleting account"));
        });
    });
});