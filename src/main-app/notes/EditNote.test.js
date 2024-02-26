import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditNote from './EditNote';
import { BrowserRouter } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('../../firebase/firebase', () => ({
  database: {},
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ noteId: 'mockNoteId' }),
  useNavigate: () => mockNavigate,
}));

const setup = () => render(
    <BrowserRouter>
        <EditNote />
    </BrowserRouter>
)

describe('EditNote Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            title: 'Mock Title',
            content: 'Mock Content',
        }),
    });
    setup(); 
  });

  //Test Case 1: Render note data
  test('renders and displays the note data for editing', async () => {
    await waitFor(() => {
      expect(screen.getByDisplayValue('Mock Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Mock Content')).toBeInTheDocument();
    });
  });

  //Test Case 2: Render title
  test('renders the title correctly', () => {
    const titleLabel = screen.getByText('Edit Note');
    expect(titleLabel).toBeInTheDocument();
  });

  //Test Case 3: Render buttons
  test('renders Save and Cancel buttons correctly', () => {
    const saveButton = screen.getByRole('button', { name: 'Save' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});