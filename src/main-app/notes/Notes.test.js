import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Notes from './Notes';

const setup = () => render(
    <BrowserRouter>
        <Notes />
    </BrowserRouter>
);

describe('Notes Component', () => {
    beforeEach(() => {
        setup()
    });

    //Test Case 1: Page Title
    test('renders the page title', () => {
        expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    //Test Case 2: Add New Note Button
    test('renders the Add New Note button', () => {
        expect(screen.getByRole('button', { name: 'Add New Note' })).toBeInTheDocument();
    });

    //Test Case 3: Check for note cards
    test('initially does not render note cards if there are no notes', () => {
        const noteCards = screen.queryByTestId('note-card');
        expect(noteCards).toBeNull();
    });

    //Test Case 4: No Notes Message
    test('renders a message when there are no notes', () => {
        expect(screen.getByText('No notes yet! Create one now!')).toBeInTheDocument();
    });
});