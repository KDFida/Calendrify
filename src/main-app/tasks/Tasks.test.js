import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Tasks from './Tasks';

const setup = () => render(
    <BrowserRouter>
        <Tasks /> 
    </BrowserRouter>
);

describe('Tasks Component', () => {
    beforeEach(() => {
        setup();
    });

    //Test Case 1: Page Title
    test('renders the Tasks page title', () => {
        const title = screen.getByText(/Tasks - Deadlines/i);
        expect(title).toBeInTheDocument();
    });

    //Test Case 2: Add Task Button
    test('renders the Add Task button', () => {
        const addTaskButton = screen.getByTestId('addTaskButton');
        expect(addTaskButton).toBeInTheDocument();
    });

    //Test Case 3: Manage Tasks Button
    test('renders the Manage Tasks button', () => {
        const manageTasksButton = screen.getByTestId('manageTasksButton');
        expect(manageTasksButton).toBeInTheDocument();
    });

    //Test Case 4: Full Calendar
    test('renders the FullCalendar component', () => {
        const fullCalendar = screen.getByTestId('fullCalendar');
        expect(fullCalendar).toBeInTheDocument();
    });
});