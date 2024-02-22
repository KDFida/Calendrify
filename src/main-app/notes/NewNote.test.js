import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewNote from './NewNote';
import { BrowserRouter } from 'react-router-dom';

const setup = () => render(
    <BrowserRouter>
        <NewNote />
    </BrowserRouter>
);

describe('NewNote Component', () => {

    //Test Case 1: Render Title
    test('renders title correctly', () => {
        setup();
        expect(screen.getByText('Create a New Note')).toBeInTheDocument();
    });
    
    //Test Case 2: Render note content
    test('renders note content correctly', () => {
        setup();
    
        expect(screen.getByPlaceholderText('Note Content')).toBeInTheDocument();
    });
    
    //Test Case 3: Render buttons
    test('renders buttons correctly', () => {
        setup();
      
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });
});