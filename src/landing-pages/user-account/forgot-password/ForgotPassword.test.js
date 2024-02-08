import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    sendPasswordResetEmail: jest.fn()
}));

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const setup = () => render(
    <BrowserRouter>
        <ForgotPassword />
    </BrowserRouter>
);

describe('ForgotPassword Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //Test Case 1: Render Component
    test('renders ForgotPassword component', () => {
        setup();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Send email' })).toBeInTheDocument();
    });

    //Test Case 2: Allows Input to be Entered
    test('allows email input to be entered', () => {
        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
        expect(screen.getByPlaceholderText('Email')).toHaveValue('user@example.com');
    });

    //Test Case 3: Submits Form and displays success toast
    test('submits form and shows success toast on valid email', async () => {
        sendPasswordResetEmail.mockResolvedValue();
        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
        fireEvent.click(screen.getByRole('button', { name: 'Send email' }));

        await waitFor(() => expect(sendPasswordResetEmail).toHaveBeenCalledWith(getAuth(), 'user@example.com'));
        expect(toast.success).toHaveBeenCalledWith("Reset password email sent ✅");
    });

    //Test Case 4: Shows Error Toast on failed email submission
    test('shows error toast on failed email submission', async () => {
        sendPasswordResetEmail.mockRejectedValue(new Error('Error sending email'));
        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'invalid@example.com');
        fireEvent.click(screen.getByRole('button', { name: 'Send email' }));

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Something went wrong. Please try again!"));
    });

    //Test Case 5: Navigate to login page if valid email
    test('navigates to login page on successful email submission', async () => {
        sendPasswordResetEmail.mockResolvedValue();
        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
        fireEvent.click(screen.getByRole('button', { name: 'Send email' }));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
    });
});