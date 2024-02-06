import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from './Login'; // Adjust the import path as necessary
import { BrowserRouter } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn()
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
        <Login />
    </BrowserRouter>
);

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //Test Case 1: Render Component
    test('renders Login component', () => {
        setup();

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    //Test Case 2: Allows Input to be Entered
    test('allows input to be entered', () => {
        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password');

        expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('password');
    });

    //Test Case 3: Submits Form and Navigates on Successful Login
    test('submits form and navigates on successful login', async () => {
        signInWithEmailAndPassword.mockResolvedValue({ user: {} });

        setup();
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password');
        userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'test@example.com', 'password'));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Successfully Signed in ✅"));
        expect(mockNavigate).toHaveBeenCalledWith('/app/home');
    });
 
    //Test Case 4: Shows Error Toast on Failed Login
    test('shows error toast on failed login', async () => {
        signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid email or password'));
        setup();
        userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid email or password. Please try again!"));
    });
});
