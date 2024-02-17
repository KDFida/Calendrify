import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Calendar from './Calendar';

const setup = () => render(
    <BrowserRouter>
        <Calendar /> 
    </BrowserRouter>
);

describe('Calendar Component', () => {
    beforeEach(() => {
        setup();
    });

    //Test Case 1: Title
    test('renders the title', () => {
        const title = screen.getByText('Calendar');
        expect(title).toBeInTheDocument();
    });

    //Test Case 2: Full Calendar
    test('renders the FullCalendar component', () => {
        const fullCalendar = screen.getByTestId('fullCalendar');
        expect(fullCalendar).toBeInTheDocument();
    });

    //Test Case 3: Set Availability button
    test('renders the Set Availability button', () => {
        const availabilityButton = screen.getByTestId('availabilityButton');
        expect(availabilityButton).toBeInTheDocument();
    });

    //Test Case 4: New Timetable button
    test('renders the New Timetable button', () => {
        const regenerateButton = screen.getByTestId('regenerateButton');
        expect(regenerateButton).toBeInTheDocument();
    });

    //Test Case 5: Manage Tasks button
    test('renders the Manage Tasks button', () => {
        const manageTasksButton = screen.getByTestId('manageTasksButton');
        expect(manageTasksButton).toBeInTheDocument();
    });

    //Test Case 6: Add task button
    test('renders the Add Task button', () => {
        const addTaskButton = screen.getByTestId('addTaskButton');
        expect(addTaskButton).toBeInTheDocument();
    });

    //Test Case 7: Dropdown menu
    test('renders the dropdown menu', () => {
        const menu = screen.getByTestId('dropdown-menu');
        expect(menu).toBeInTheDocument();
    });
});