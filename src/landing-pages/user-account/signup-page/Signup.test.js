import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Signup from './Signup';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc } from "firebase/firestore";

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    setDoc: jest.fn()
}));

jest.mock("../../../firebase/firebase", () => ({
    database: jest.fn()
}));

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockNavigate = jest.fn();

const setup = () => render(
    <BrowserRouter>
        <Signup />
    </BrowserRouter>
);

describe('Signup Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //Test Case 1: Render Component
    test('renders Signup component', () => {
        setup();

        expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    });

    //Test Case 2: Allows Input to be Entered
    test('allows input to be entered', () => {
        setup();
        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'Password123!');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'Password123!');

        expect(screen.getByPlaceholderText('Full Name')).toHaveValue('John Doe');
        expect(screen.getByPlaceholderText('Email')).toHaveValue('john@example.com');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('Password123!');
        expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue('Password123!');
    });

    //Test Case 3: Submits Form and Navigates on Successful Signup
    test('submits form and navigates on successful signup', async () => {
        createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: "123", email: "john@example.com" }});
        setDoc.mockResolvedValue(() => Promise.resolve());

        setup();
        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'Password123!');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'Password123!');
        userEvent.click(screen.getByRole('button', { name: 'Create Account' }));

        await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'john@example.com', 'Password123!'));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Account created successfully. Please log in!"));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    //Test Case 4: Shows Error Toast on Failed Login
    test('shows error toast on failed signup', async () => {
        createUserWithEmailAndPassword.mockRejectedValue(new Error('Failed to create account'));

        setup();
        userEvent.click(screen.getByRole('button', { name: 'Create Account' }));

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Password must contain at least 8 characters. Please try again!"));
    });
});