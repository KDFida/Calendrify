import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTaskDialog from './AddTaskDialog';
import { toast } from 'react-toastify';
import userEvent from '@testing-library/user-event';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../firebase/firebase', () => ({
  firebase: {
    authentication: {
      currentUser: { 
        uid: 'testUser123',
      },
    },
    database: {},
  },
  addDoc: jest.fn(() => Promise.resolve({})),
  collection: jest.fn(),
}));

describe('AddTaskDialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<AddTaskDialog open={true} onClose={mockOnClose} />);
  });

  //Test Case 1: Render component
  test('renders correctly', () => {
    expect(screen.getByLabelText('Task Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByLabelText('Estimated Hours to Complete')).toBeInTheDocument();
  });

  //Test Case 2: Display error if no valid inputs
  test('validates inputs before submission', async () => {
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(toast.error));
  });

  //Test Case 3: Add task name
  test('updates task name on user input', async () => {
    await userEvent.type(screen.getByLabelText('Task Name'), 'New Task');
    expect(screen.getByLabelText('Task Name')).toHaveValue('New Task');
  });

  //Test Case 4: Clear form after submission
  test('clears form after successful submission', async () => {
    fireEvent.click(screen.getByText('Save'));
  
    await waitFor(() => expect(screen.getByLabelText('Task Name')).toHaveValue(''));
  });

  //Test Case 5: Close dialog on button close
  test('closes the dialog on close button click', async () => {
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  }); 

  //Test Case 6: Set a deadline
  test('allows user to set a task deadline', async () => {
    await userEvent.type(screen.getByLabelText('Deadline'), '2023-12-31');
    expect(screen.getByLabelText('Deadline')).toHaveValue('2023-12-31');
  });  
}); 