import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BottomBar from './bottomBar';

const setup = () => render(
    <BrowserRouter>
        <BottomBar />
    </BrowserRouter>
);

describe('BottomBar Component', () => {
    // Test Case 1: Render Component
    test('renders BottomBar component', () => {
        setup();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    // Test Case 2: Navigation to About Us page
    test('navigates to About Us page', () => {
        setup();

        const aboutUsLink = screen.getByText('About Us');
        userEvent.click(aboutUsLink);

        expect(window.location.pathname).toBe('/about-us');
    });

    // Test Case 3: Navigation to Contact Us page
    test('navigates to Contact Us page', () => {
        setup();

        const contactUsLink = screen.getByText('Contact Us');
        userEvent.click(contactUsLink);

        expect(window.location.pathname).toBe('/contact-us');
    });

    // Test Case 4: Navigation to Home page
    test('navigates to Home page', () => {
        setup();

        const homeLink = screen.getByText('Home');
        userEvent.click(homeLink);

        expect(window.location.pathname).toBe('/home');
    });
});
