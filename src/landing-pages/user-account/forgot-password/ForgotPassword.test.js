import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from './ForgotPassword';
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const setup = () => render(
    <ForgotPassword />
);

describe('ForgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sendPasswordResetEmail.mockClear();
    useNavigate.mockImplementation(() => jest.fn());
  });

  //Test Case 1: Render Component
  test('renders correctly', () => {
    setup();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Send email")).toBeInTheDocument();
  });

  //Test Case 2: Allows Input to be Entered 
  test('updates email input', () => {
    setup();
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  //Test Case 3: Submits Form and displays success toast
  test('sends reset email on form submission', async () => {
    sendPasswordResetEmail.mockResolvedValue();
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    setup();
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText("Send email"));

    await waitFor(() => expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect().toBeUndefined(), 'test@example.com'));
    expect(toast.success).toHaveBeenCalledWith("Reset password email sent ✅");
    expect(navigateMock).toHaveBeenCalledWith('/login');
  }); 

  //Test Case 4: Shows Error Toast on failed email submission
  test('displays error toast on reset email failure', async () => {
    sendPasswordResetEmail.mockRejectedValue(new Error('Failed to send reset email'));

    setup();
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText("Send email"));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Something went wrong. Please try again!"));
  });
});