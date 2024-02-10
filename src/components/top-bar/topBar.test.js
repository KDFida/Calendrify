import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/';
import TopBar from './topBar';
import { BrowserRouter } from 'react-router-dom';

const setup = () => render(
    <BrowserRouter>
        <TopBar />
    </BrowserRouter>
);

describe('TopBar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024
        });
        window.dispatchEvent(new Event('resize'));
    });

    //Test Case 1: Render Component
    test('renders TopBar and checks for logo and menu items', () => {
        setup();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    //Test Case 2: Toggle Hamburger Menu on Click in Mobile View
    test('toggles hamburger menu on click in mobile view', () => {
        Object.defineProperty(window, 'innerWidth', {
            value: 500
        });
        window.dispatchEvent(new Event('resize'));

        setup();

        const hamburgerMenuIcon = screen.getByRole('img');
        userEvent.click(hamburgerMenuIcon);

        expect(screen.getByText('Home').closest('div')).toHaveClass('options');
    });

    //Test Case 3: Hide Hamburger Menu on Window Resize to Desktop Width
    test('hides hamburger menu on window resize to desktop width', () => {
        Object.defineProperty(window, 'innerWidth', {
            value: 500
        });
        window.dispatchEvent(new Event('resize'));

        setup();

        const hamburgerMenuIcon = screen.getByRole('img');
        userEvent.click(hamburgerMenuIcon);

        Object.defineProperty(window, 'innerWidth', {
            value: 1024
        });
        window.dispatchEvent(new Event('resize'));

        expect(screen.getByText('Home').closest('div')).not.toHaveClass('options active');
    });
});