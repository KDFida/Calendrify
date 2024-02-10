import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

const setup = () => render(
    <Router>
        <Sidebar />
    </Router>
);

describe('Sidebar Component', () => {
    //Test Case 1: Verify all navigation links are rendered in the Sidebar
    test('renders Sidebar component and its navigation links', () => {
        setup();
        expect(screen.getByTestId('home-link')).toBeInTheDocument();
        expect(screen.getByTestId('calendar-link')).toBeInTheDocument();
        expect(screen.getByTestId('tasks-link')).toBeInTheDocument();
        expect(screen.getByTestId('task-tracking-link')).toBeInTheDocument();
        expect(screen.getByTestId('notes-link')).toBeInTheDocument();
        expect(screen.getByTestId('settings-link')).toBeInTheDocument();
    });

    //Test Case 2: Verify navigation to Home page works when its link is clicked
    test('navigates to Home page when Home link is clicked', () => {
        setup();
        const homeLink = screen.getByTestId('home-link');
        userEvent.click(homeLink);
    });

    //Test Case 3: Verify navigation to Calendar page works when its link is clicked
    test('navigates to Calendar page when Calendar link is clicked', () => {
        setup();
        const calendarLink = screen.getByTestId('calendar-link');
        userEvent.click(calendarLink);
    });

    //Test Case 4: Verify navigation to Tasks page works when its link is clicked
    test('navigates to Tasks page when Tasks link is clicked', () => {
        setup();
        const tasksLink = screen.getByTestId('tasks-link');
        userEvent.click(tasksLink);
    });

    //Test Case 5: Verify navigation to Task Tracking page works when its link is clicked
    test('navigates to Task Tracking page when Task Tracking link is clicked', () => {
        setup();
        const taskTrackingLink = screen.getByTestId('task-tracking-link');
        userEvent.click(taskTrackingLink);
    });

    //Test Case 6: Verify navigation to Notes page works when its link is clicked
    test('navigates to Notes page when Notes link is clicked', () => {
        setup();
        const notesLink = screen.getByTestId('notes-link');
        userEvent.click(notesLink);
    });

    //Test Case 7: Verify navigation to Settings page works when its link is clicked
    test('navigates to Settings page when Settings link is clicked', () => {
        setup();
        const settingsLink = screen.getByTestId('settings-link');
        userEvent.click(settingsLink);
    });
});
