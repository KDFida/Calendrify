import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from './ContactUs';
import { addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Use mocked verison to prevent netowrk requests 
jest.mock("../../firebase/firebase", () => ({
    database: jest.fn(),
  }));

  jest.mock("firebase/firestore", () => ({
    collection: jest.fn(() => "Contact us Messages"),
    addDoc: jest.fn(),
  }));

  jest.mock("react-toastify", () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
}));

describe('ContactUs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1: Component renders
  test('renders correctly', () => {
    render(<ContactUs />);
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your message...')).toBeInTheDocument();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  // Test case 2: check if input can be entered
  test('allows input to be entered', () => {
    render(<ContactUs />);
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'TestUser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Write your message...'), { target: { value: 'Hello there!' } });

    expect(screen.getByPlaceholderText('Full Name')).toHaveValue('Test User');
    expect(screen.getByPlaceholderText('Email Address')).toHaveValue('TestUser@example.com');
    expect(screen.getByPlaceholderText('Write your message...')).toHaveValue('Hello there!');
  });

  // Test case 3: Test successful toast message
  test('submits the form and shows success message', async () => {
    render(<ContactUs />);
    addDoc.mockResolvedValueOnce({ id: 'mockDoc' });

    fireEvent.submit(screen.getByText('Send Message'));

    await waitFor(() => expect(addDoc).toHaveBeenCalled());
    expect(toast.success).toHaveBeenCalledWith("Message has been sent ✅");
  });

  // Test case 4: Test failed toast message
  test('shows error message on submission failure', async () => {
    render(<ContactUs />);
    const errorMessage = "Failed to send message";
    addDoc.mockRejectedValueOnce(new Error(errorMessage));

    fireEvent.submit(screen.getByText('Send Message'));

    await waitFor(() => expect(addDoc).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});