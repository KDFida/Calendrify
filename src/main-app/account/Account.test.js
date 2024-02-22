import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Account from './Account';
import { BrowserRouter } from 'react-router-dom';

const setup = () => render(
    <BrowserRouter>
        <Account />
    </BrowserRouter>
);

describe('Account Component', () => {

    //Test Case 1: Render Title
    test('renders user profile title', async () => {
        setup();

        await waitFor(() => {
            expect(screen.getByText('User Profile')).toBeInTheDocument();
        });
    });

    //Test Case 2: Render Labels
    test('renders user profile labels', async () => {
        setup();

        await waitFor(() => {
            expect(screen.getByText('Full name:')).toBeInTheDocument();
            expect(screen.getByText('Email Address:')).toBeInTheDocument();
            expect(screen.getByText('Account created on:')).toBeInTheDocument();
        });
    });
});